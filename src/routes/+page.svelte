<!-- Hero Section -->
<div class="relative w-full">
  <img src="/asset/img/homeBG.jpg" alt="Ming's Bakery" class="w-full h-96 object-cover" />
  <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded">
    <h1 class="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
      Ring in Spring With Our Limited-Time Treats!
    </h1>
    <p class="text-white mt-3 text-lg md:text-xl text-center drop-shadow">
      Now available for the start of the new season! Order in advance for pick
      up or stop by any of our bakeries.
    </p>
  </div>
</div>

<!-- Promo Carousel (Tailwind version, no Bootstrap JS) -->
<div class="my-10 max-w-3xl mx-auto">
  <div class="relative rounded shadow overflow-hidden h-72">
    <img
      src="/asset/img/img1.jpeg"
      alt="Promo 1"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
      style="opacity: 1;"
    />
    <div class="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b">
      <h5 class="text-white text-xl font-semibold">Buy 1 Get 1 Free</h5>
      <p class="text-white">Every Friday on selected pastries!</p>
    </div>
  </div>
  <!-- Carousel indicators (static for now) -->
  <div class="flex justify-center gap-2 mt-4">
    <button class="w-3 h-3 rounded-full bg-gray-800"></button>
    <button class="w-3 h-3 rounded-full bg-gray-400"></button>
    <button class="w-3 h-3 rounded-full bg-gray-400"></button>
  </div>
</div>