export function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px", // Start loading 50px before image enters viewport
    }
  );

  images.forEach((img) => observer.observe(img));
}
