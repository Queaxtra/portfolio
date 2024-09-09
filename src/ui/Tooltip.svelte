<script lang="ts">
    export let text: string = 'Tooltip text';
    export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
    export let color: 'gray' = 'gray';
    export let size: 'small' | 'medium' | 'large' = 'medium';

    const positions = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    const colors = {
        gray: "bg-qLightGray text-black dark:bg-qDarkGray dark:text-white",
    };

    const sizes = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg'
    };

    $: tooltipClasses = `${positions[position]} ${colors[color]} ${sizes[size]} rounded-lg`;
</script>

<div class="relative inline-block group">
  <slot />
  <div class={`absolute z-10 ${tooltipClasses} opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out`}>
    {text}
  </div>
</div>