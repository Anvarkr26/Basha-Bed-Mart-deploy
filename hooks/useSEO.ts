import { useEffect } from 'react';

/**
 * A custom hook to dynamically update SEO meta tags (title, description, keywords).
 * @param {object} seoData - The SEO data for the page.
 * @param {string} seoData.title - The page title.
 * @param {string} seoData.description - The meta description content.
 * @param {string} seoData.keywords - The meta keywords content.
 */
const useSEO = ({ title, description, keywords }: { title: string; description: string; keywords: string; }) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // --- Update or create meta description ---
    let metaDescription = document.querySelector('meta[name="description"]');
    // If the tag doesn't exist, create it and append to the head.
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    // Set the content of the description meta tag.
    metaDescription.setAttribute('content', description);

    // --- Update or create meta keywords ---
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    // If the tag doesn't exist, create it and append to the head.
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    // Set the content of the keywords meta tag.
    metaKeywords.setAttribute('content', keywords);

  // Re-run the effect if any of the SEO data changes.
  }, [title, description, keywords]);
};

export default useSEO;
