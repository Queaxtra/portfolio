<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let time: string;
    let interval: number;

    function updateTime() {
        time = new Intl.DateTimeFormat(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(new Date());
    }

    onMount(() => {
        updateTime();
        interval = setInterval(updateTime, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<footer class="w-full my-6">
    <div class="w-full max-w-6xl mx-auto">
        <div class="opacity-50 text-sm flex">
            <span>© {new Date().getFullYear()} • Fatih Yılmaz</span>
            <span class="ml-auto">{time}</span>
        </div>
    </div>
</footer>
