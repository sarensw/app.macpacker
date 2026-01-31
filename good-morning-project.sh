#!/bin/bash

# good-morning-project.sh
# Autonomous development system - Project workflow orchestrator
# Supports full workflow or step-by-step execution

set -e  # Exit on error

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATE_DIR="$PROJECT_DIR/.claude/state"
WORK_DIR="$PROJECT_DIR/.claude/work"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${CYAN}▶️  $1${NC}"
}

# Ensure directories exist
mkdir -p "$STATE_DIR" "$WORK_DIR"

# Help text
show_help() {
    cat << EOF
Autonomous Development System - Project Orchestrator

Usage: $0 [COMMAND]

Commands:
  (none)          Run complete workflow (all steps)
  fetch           Fetch next Jira ticket
  git             Create git branch  
  impl            Run implementation agents
  test            Run tests and validation
  review          Run quality review
  pr              Create commits and update Jira
  status          Show current ticket status
  help            Show this help message

Step-by-step workflow:
  $0 fetch        # 1. Fetch ticket from Jira
  $0 git          # 2. Create feature branch
  $0 impl         # 3. Implement feature
  $0 test         # 4. Run tests
  $0 review       # 5. Quality review
  $0 pr           # 6. Create PR and update Jira

Full automation:
  $0              # Runs all steps automatically

Examples:
  $0                    # Full workflow
  $0 fetch              # Just fetch next ticket
  $0 impl               # Just run implementation
  $0 status             # Check current status

EOF
}

# Show status
show_status() {
    echo "================================"
    echo "📊 Current Status"
    echo "================================"
    
    if [ -f "$STATE_DIR/current-ticket.json" ]; then
        TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
        STATUS=$(jq -r '.status' "$STATE_DIR/current-ticket.json")
        BRANCH=$(jq -r '.branch // "not created"' "$STATE_DIR/current-ticket.json")
        ITERATION=$(jq -r '.iteration // 1' "$STATE_DIR/current-ticket.json")
        
        echo "Current Ticket: $TICKET_KEY"
        echo "Status: $STATUS"
        echo "Branch: $BRANCH"
        echo "Iteration: $ITERATION"
        
        if [ -f "$WORK_DIR/$TICKET_KEY-spec.md" ]; then
            echo ""
            echo "Files created:"
            ls -1 "$WORK_DIR/$TICKET_KEY"* 2>/dev/null || echo "  None yet"
        fi
    else
        echo "No ticket in progress"
        echo "Run: $0 fetch"
    fi
    
    echo ""
    echo "Recent progress:"
    ls -1 "$STATE_DIR"/daily-progress-*.json 2>/dev/null | tail -3 | while read file; do
        DATE=$(basename "$file" | sed 's/daily-progress-\(.*\)\.json/\1/')
        COUNT=$(jq '.tickets_processed | length' "$file")
        echo "  $DATE: $COUNT tickets"
    done || echo "  No progress yet"
    echo ""
}

# Step 1: Fetch ticket
step_fetch() {
    log_step "STEP 1.a: Fetching Jira ticket..."

    local raw_file=".claude/state/raw-ticket.json"
    local ticket_file=".claude/state/current-ticket.json"
    mkdir -p ".claude/state"

    log_info "Fetching next ticket from Jira (filter = Fetch_Next)..."

    python3 .claude/scripts/jira_fetch_top.py

    if [ "$(jq -r '.status // empty' "$raw_file")" == "idle" ]; then
        log_warning "No tickets available in backlog"
        exit 0
    fi

    TICKET_KEY=$(jq -r '.issue_key // empty' "$raw_file")
    if [ -z "$TICKET_KEY" ] || [ "$TICKET_KEY" == "null" ]; then
        log_warning "Could not read issue_key from $raw_file"
        exit 1
    fi

    log_step "STEP 1.b: Converting Jira ticket to markdown..."
    python3 .claude/scripts/ticket_json_to_md.py

    claude -p "Use jira-reader subagent to read the raw ticket .claude/state/raw-ticket.json and convert it into internal JSON format for processing" --dangerously-skip-permissions

    log_success "Fetched and converted: $TICKET_KEY"
}

# Step 2: Create git branch
step_git() {
    log_step "STEP 2: Creating git branch..."
    
    if [ ! -f "$STATE_DIR/current-ticket.json" ]; then
        log_error "No ticket loaded. Run: $0 fetch"
        exit 1
    fi
    
    TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
    BRANCH=$(jq -r '.branch // ""' "$STATE_DIR/current-ticket.json")
    
    if [ -n "$BRANCH" ] && [ "$BRANCH" != "null" ]; then
        log_info "Branch already exists: $BRANCH"
        return 0
    fi
    
    log_info "Creating branch for $TICKET_KEY..."
    claude -p "Use git-senior subagent to create feature branch for $TICKET_KEY" --dangerously-skip-permissions
    
    BRANCH=$(jq -r '.branch' "$STATE_DIR/current-ticket.json")
    log_success "Branch created: $BRANCH"
}

# Step 3: Implementation
step_impl() {
    log_step "STEP 3: Running implementation agents..."
    
    if [ ! -f "$STATE_DIR/current-ticket.json" ]; then
        log_error "No ticket loaded. Run: $0 fetch"
        exit 1
    fi
    
    TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
    REQUIRED_AGENTS=$(jq -r '.required_agents[]' "$STATE_DIR/current-ticket.json")
    
    log_info "Required agents: $(echo $REQUIRED_AGENTS | tr '\n' ',' | sed 's/,$//')"
    
    # Web Developer
    if echo "$REQUIRED_AGENTS" | grep -q "web-developer"; then
        log_info "Running web-developer..."
        claude -p "Use web-developer subagent to implement $TICKET_KEY" --dangerously-skip-permissions
        log_success "Web development complete"
    fi
    
    # Translator
    if echo "$REQUIRED_AGENTS" | grep -q "translator"; then
        log_info "Running translator..."
        claude -p "Use translator subagent to add translations for $TICKET_KEY" --dangerously-skip-permissions
        log_success "Translation complete"
    fi
    
    # Marketer
    if echo "$REQUIRED_AGENTS" | grep -q "marketer"; then
        log_info "Running marketer..."
        claude -p "Use marketer subagent to create content for $TICKET_KEY" --dangerously-skip-permissions
        log_success "Content creation complete"
    fi
}

# Step 4: Testing
step_test() {
    log_step "STEP 4: Running tests and validation..."
    
    if [ ! -f "$STATE_DIR/current-ticket.json" ]; then
        log_error "No ticket loaded. Run: $0 fetch"
        exit 1
    fi
    
    TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
    
    log_info "Running web-tester..."
    claude -p "Use web-tester subagent to validate $TICKET_KEY" --dangerously-skip-permissions
    
    TEST_RESULT=$(jq -r '.test_status // "unknown"' "$STATE_DIR/current-ticket.json")
    
    if [ "$TEST_RESULT" != "passed" ]; then
        log_error "Tests failed - check $WORK_DIR/$TICKET_KEY-test-report.md"
        exit 1
    fi
    
    log_success "All tests passed"
}

# Step 5: Review
step_review() {
    log_step "STEP 5: Running quality review..."
    
    if [ ! -f "$STATE_DIR/current-ticket.json" ]; then
        log_error "No ticket loaded. Run: $0 fetch"
        exit 1
    fi
    
    TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
    
    log_info "Running reviewer..."
    claude -p "Use reviewer subagent to review all work for $TICKET_KEY" --dangerously-skip-permissions
    
    REVIEW_STATUS=$(jq -r '.reviewer_decision // "unknown"' "$STATE_DIR/current-ticket.json")
    
    if [ "$REVIEW_STATUS" == "NEEDS_WORK" ]; then
        log_warning "Reviewer requested changes"
        log_info "Re-running affected agents..."
        
        # Extract which agents need to fix issues
        REWORK_AGENTS=$(jq -r '.rework_agents[]' "$STATE_DIR/current-ticket.json" 2>/dev/null || echo "")
        
        if [ -n "$REWORK_AGENTS" ]; then
            for agent in $REWORK_AGENTS; do
                log_info "Re-running $agent with feedback..."
                claude -p "Use $agent subagent to address reviewer feedback for $TICKET_KEY" --dangerously-skip-permissions
            done
            
            # Re-test
            log_info "Re-running tests..."
            claude -p "Use web-tester subagent to validate $TICKET_KEY" --dangerously-skip-permissions
            
            # Re-review
            log_info "Re-running reviewer..."
            claude -p "Use reviewer subagent to review all work for $TICKET_KEY" --dangerously-skip-permissions
            
            REVIEW_STATUS=$(jq -r '.reviewer_decision' "$STATE_DIR/current-ticket.json")
            
            if [ "$REVIEW_STATUS" != "APPROVED" ]; then
                log_error "Still not approved after rework - manual intervention required"
                log_info "Check: $WORK_DIR/$TICKET_KEY-review.md"
                exit 1
            fi
        fi
    fi
    
    log_success "Review approved"
}

# Step 6: Create PR
step_pr() {
    log_step "STEP 6: Creating commits and updating Jira..."
    
    if [ ! -f "$STATE_DIR/current-ticket.json" ]; then
        log_error "No ticket loaded. Run: $0 fetch"
        exit 1
    fi
    
    TICKET_KEY=$(jq -r '.ticket_key' "$STATE_DIR/current-ticket.json")
    
    log_info "Running pr-agent..."
    claude -p "Use pr-agent subagent to finalize $TICKET_KEY" --dangerously-skip-permissions
    
    COMMITS=$(jq -r '.commits_created // 0' "$STATE_DIR/current-ticket.json")
    BRANCH=$(jq -r '.branch' "$STATE_DIR/current-ticket.json")
    
    log_success "Created $COMMITS commit(s)"
    log_success "Jira ticket updated with summary"
    log_success "Ticket moved to 'In Review' status"
    
    # Update daily progress
    TODAY=$(date '+%Y-%m-%d')
    PROGRESS_FILE="$STATE_DIR/daily-progress-$TODAY.json"
    
    if [ ! -f "$PROGRESS_FILE" ]; then
        echo '{"date":"'$TODAY'","tickets_processed":[],"tickets_in_review":[],"started_at":"'$(date -Iseconds)'"}' > "$PROGRESS_FILE"
    fi
    
    jq ".tickets_processed += [\"$TICKET_KEY\"] | .tickets_in_review += [\"$TICKET_KEY\"] | .last_update = \"$(date -Iseconds)\"" "$PROGRESS_FILE" > "$PROGRESS_FILE.tmp"
    mv "$PROGRESS_FILE.tmp" "$PROGRESS_FILE"
    
    # Clean up current ticket state
    rm -f "$STATE_DIR/current-ticket.json"
    
    echo ""
    echo "================================"
    echo "✅ Ticket Complete: $TICKET_KEY"
    echo "================================"
    echo "Status: In Review (awaiting PO)"
    echo "Branch: $BRANCH"
    echo ""
    echo "Next steps:"
    echo "1. Review ticket in Jira: $TICKET_KEY"
    echo "2. If approved: Resolve ticket"
    echo "3. If rejected: Add comment and move to 'In Progress'"
    echo ""
}

# Main execution
COMMAND=${1:-full}

case "$COMMAND" in
    help|--help|-h)
        show_help
        exit 0
        ;;
    status)
        show_status
        exit 0
        ;;
    fetch)
        echo "================================"
        echo "🌅 Fetching Jira Ticket"
        echo "================================"
        echo ""
        step_fetch
        echo ""
        log_info "Next: $0 git"
        ;;
    git)
        echo "================================"
        echo "🌿 Creating Git Branch"
        echo "================================"
        echo ""
        step_git
        echo ""
        log_info "Next: $0 impl"
        ;;
    impl|implement)
        echo "================================"
        echo "⚙️  Running Implementation"
        echo "================================"
        echo ""
        step_impl
        echo ""
        log_info "Next: $0 test"
        ;;
    test)
        echo "================================"
        echo "🧪 Running Tests"
        echo "================================"
        echo ""
        step_test
        echo ""
        log_info "Next: $0 review"
        ;;
    review)
        echo "================================"
        echo "👁️  Quality Review"
        echo "================================"
        echo ""
        step_review
        echo ""
        log_info "Next: $0 pr"
        ;;
    pr)
        echo "================================"
        echo "📦 Creating PR"
        echo "================================"
        echo ""
        step_pr
        ;;
    full|"")
        # Full workflow
        echo "================================"
        echo "🌅 Good Morning - Starting Work"
        echo "Project: $(basename $PROJECT_DIR)"
        echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "================================"
        echo ""
        
        step_fetch
        echo ""
        step_git
        echo ""
        step_impl
        echo ""
        step_test
        echo ""
        step_review
        echo ""
        step_pr
        ;;
    *)
        log_error "Unknown command: $COMMAND"
        echo ""
        show_help
        exit 1
        ;;
esac