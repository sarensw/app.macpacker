import { useEffect } from 'react'

/**
 * Injects a JSON-LD structured data script tag into the document head.
 * Removes the script tag on unmount or when data changes.
 */
function useStructuredData(data: object | null, id: string) {
  useEffect(() => {
    if (!data) return

    const existing = document.getElementById(id)
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [data, id])
}

export { useStructuredData }
