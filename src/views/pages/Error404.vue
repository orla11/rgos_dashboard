<template>
    <div id="not-found-page" class="h-screen flex w-full">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="@/assets/images/pages/404.png" alt="graphic-404" class="mx-auto mb-4 max-w-full">
            <h1 class="sm:mx-0 mx-4 mb-12 text-5xl text-warning">404 - Page Not Found!</h1>
            <h4 class="sm:mx-0 mx-4 mb-4 sm:mb-16 text-warning">Unfortunately we have no idea where you are going, please go back 😢</h4>
            <vs-button size="large" to="/">Back to Home</vs-button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
#not-found-page {
    background-image: none;
    background-color: #10163A;
}
</style>
