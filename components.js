function insertHeader() {
  const header = document.getElementById('header-placeholder');
  if (header) {
    header.innerHTML = `
<header class="w-full px-8 py-4 flex justify-between items-center shadow-sm md:px-12">
  <div class="flex items-center gap-2">
    <img src="assets/Camera%20log.png" alt="EcoSnap logo" class="w-6 h-6" />
    <h1 class="text-2xl font-bold text-green-600">EcoSnap</h1>
  </div>
  <nav class="flex gap-6 text-sm font-medium items-center">
    <a href="index.html" class="hover:text-green-600">Home</a>
    <a href="#" class="hover:text-green-600">Login</a>
  </nav>
</header>`;
  }
}

function insertFooter() {
  const footer = document.getElementById('footer-placeholder');
  if (footer) {
    footer.innerHTML = `
<footer class="w-full bg-gray-900 text-white py-8 px-6 text-center">
  <div class="flex flex-col items-center space-y-4">
    <div class="flex items-center gap-2">
      <div class="w-5 h-5 bg-green-600 rounded-full"></div>
      <h5 class="text-lg font-bold">EcoSnap</h5>
    </div>
    <p class="text-sm text-gray-400 max-w-xs">
      Making everyday choices greener with the power of AI.
    </p>
    <div class="flex flex-wrap justify-center gap-4 text-sm">
      <a href="info.html#about" class="hover:underline">About Us</a>
      <a href="info.html#why" class="hover:underline">Why</a>
      <a href="info.html#blog" class="hover:underline">Blog</a>
      <a href="green_agent.html" class="hover:underline">Green Agent</a>
    </div>
    <div class="flex gap-4">
      <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-twitter"></i></a>
      <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-instagram"></i></a>
      <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-linkedin"></i></a>
    </div>
    <p class="text-xs text-gray-500">© 2025 EcoSnap. All rights reserved.</p>
  </div>
</footer>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  insertHeader();
  insertFooter();
});
