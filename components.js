function insertHeader() {
  const header = document.getElementById('header-placeholder');
  if (header) {
    header.innerHTML = `
<header class="w-full px-8 py-4 flex justify-between items-center shadow-sm md:px-12">
  <div class="flex items-center gap-2">
    <img src="assets/Camera%20log.png" alt="EcoSnap logo" class="w-10 h-10" />
    <h1 class="text-4xl font-bold text-green-600">EcoSnap</h1>
  </div>
  <nav class="flex gap-6 text-sm font-medium items-center">
    <a href="index.html" aria-label="Home" class="hover:text-green-600">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V19a1 1 0 001 1h5a1 1 0 001-1v-4h2v4a1 1 0 001 1h5a1 1 0 001-1V8.586l-7.293-7.293z"/>
      </svg>
    </a>
  </nav>
</header>`;
  }
}

function insertFooter() {
  const footer = document.getElementById('footer-placeholder');
  if (footer) {
    footer.innerHTML = `
<footer class="w-full bg-[#e4f2e7] text-gray-800 py-8 px-6">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
    <div class="flex flex-col items-center md:items-start gap-2 md:flex-1">
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 bg-green-600 rounded-full"></div>
        <h5 class="text-xl font-bold">EcoSnap</h5>
      </div>
      <p class="text-sm">Making everyday choices greener with the power of AI.</p>
    </div>
    <nav class="flex justify-center gap-4 text-sm md:flex-1">
      <a href="info.html#about" class="hover:underline">About Us</a>
      <a href="info.html#why" class="hover:underline">Why</a>
      <a href="info.html#blog" class="hover:underline">Blog</a>
    </nav>
    <div class="flex justify-center gap-4 md:flex-1">
      <a href="#" class="text-gray-600 hover:text-gray-800 text-xl"><i class="fab fa-twitter"></i></a>
      <a href="#" class="text-gray-600 hover:text-gray-800 text-xl"><i class="fab fa-instagram"></i></a>
      <a href="#" class="text-gray-600 hover:text-gray-800 text-xl"><i class="fab fa-linkedin"></i></a>
    </div>
  </div>
  <p class="mt-6 text-xs text-center text-gray-600">© 2025 EcoSnap. All rights reserved.</p>
</footer>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  insertHeader();
  insertFooter();
});
