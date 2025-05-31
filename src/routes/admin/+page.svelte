<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    let salesChart;
    let userName = "";

    onMount(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            userName = user.name;
        }
        const canvas = document.getElementById("salesChart") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            salesChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            label: "Sales",
                            data: [120, 190, 300, 500, 200, 300, 400],
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                },
            });
        }
    });
</script>

<div class="content ml-[250px] p-8 bg-gray-50 min-h-screen">
    <h2 class="mb-6 text-2xl font-semibold">Dashboard</h2>
<main>
    <h1>Welcome, {userName}</h1>
    <slot />
</main>
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded shadow-sm border border-gray-100 p-6 flex flex-col items-start">
            <h6 class="text-gray-500 text-sm mb-2">Total Pesanan</h6>
            <h4 class="text-2xl font-bold">128</h4>
        </div>
        <div class="bg-white rounded shadow-sm border border-gray-100 p-6 flex flex-col items-start">
            <h6 class="text-gray-500 text-sm mb-2">Total Penjualan</h6>
            <h4 class="text-2xl font-bold">Rp 4.200.000</h4>
        </div>
        <div class="bg-white rounded shadow-sm border border-gray-100 p-6 flex flex-col items-start">
            <h6 class="text-gray-500 text-sm mb-2">Stok Produk</h6>
            <h4 class="text-2xl font-bold">43</h4>
        </div>
        <div class="bg-white rounded shadow-sm border border-gray-100 p-6 flex flex-col items-start">
            <h6 class="text-gray-500 text-sm mb-2">Pesanan Berjalan</h6>
            <h4 class="text-2xl font-bold">12</h4>
        </div>
    </div>

    <!-- Sales Chart -->
    <div class="bg-white rounded shadow-sm border border-gray-100 p-6">
        <h5 class="text-lg font-semibold mb-4">Grafik Penjualan Mingguan</h5>
        <canvas id="salesChart" height="120"></canvas>
    </div>
</div>