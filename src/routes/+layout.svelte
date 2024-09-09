<script>
    import "../app.css";

    let theme = 'light';

    if (typeof window !== 'undefined') {
        theme = localStorage.getItem('theme') || 'light';
    }
</script>

<slot></slot>
<style>
    
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

:global(body) {
    color: black;
    font-family: 'Raleway', sans-serif;
    transition: background-color 0.3s ease;
    position: relative;
    overflow-x: hidden;
    background-color: #ffffff;
    opacity: 1;
    background-image: radial-gradient(#d7d7d7 0.5px, transparent 0.5px), radial-gradient(#d7d7d7 0.5px, #ffffff 0.5px);
    background-size: 20px 20px;
    background-position: center center, center center;
}

:global(.dark body) {
    background-color: #131313;
    color: #fafafa;
    background-image: radial-gradient(#2a2a2a 0.5px, transparent 0.5px), radial-gradient(#2a2a2a 0.5px, #131313 0.5px);
    background-size: 20px 20px;
    background-position: center center, center center;
}

:global(body::before),
:global(body::after) {
    content: '';
    position: fixed;
    border-radius: 50%;
    opacity: 0.05;
    filter: blur(200px);
    z-index: -1;
    transition: all 0.5s ease;
}

:global(body::after) {
    width: 600px;
    height: 600px;
    background-color: #8000ff;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    box-shadow: 0 0 80px #8000ff;
}

:global(body:hover::before),
:global(body:hover::after) {
    filter: blur(200px);
    opacity: 0.1;
}

:global(.dark body:hover::after) {
    filter: blur(200px);
    opacity: 0.08;
}

</style>