<script setup lang="ts">

</script>

<template>
    <div class="top-bar">
        <span>
            4002 - 8922
        </span>
        <ul>
            <li>
                <a href="#">
                </a>
            </li>
            <li>
                <a href="#">
                </a>
            </li>
            <li>
                <a href="#">
                </a>
            </li>
        </ul>
    </div>

    <nav>
        <div class="logo">
            <a href="#"><img src="/quatro.png" alt="logo"></a>
        </div>
        <div class="toggle">
            <a href="#">
            </a>
        </div>
        <ul class="menu">
            <li>
                <nuxt-link to="/home">Home</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/adoption">Adoption</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/contact">Contact</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/home/rules">Rules</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/login">Login</nuxt-link>
            </li>
        </ul>
    </nav>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

body {
    font-family: "Poppins", "sans-serif";
}

a,
a:hover {
    text-decoration: none;
}

.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 25px;
    background: rgb(253, 204, 97);
}

.top-bar span {
    color: black;
}

.top-bar ul {
    list-style: none;
    display: flex;
}

.top-bar li {
    margin: 0px 5px;
}

.top-bar a {
    color: black;
}

.top-bar a:hover {
    color: #fff;
}

nav {
    background: #222;
    padding: 5px 20px;
    display: flex;
    align-items: center;
}

nav a {
    color: #fff;
}

nav a:hover {
    color: rgb(253, 204, 97);
}

.logo {
    flex: 1;
    padding: 30px;
}

.logo a {
    display: flex;
    align-items: center;
    font-size: 20px;
}

.logo a:hover {
    color: #fff;
}

.logo img {
    width: 110px;
    margin-right: 10px;
}

.menu {
    display: flex;
    align-items: center;
    list-style: none;
}

.menu li {
    padding: 15px 10px;
    font-size: 16px;
}

.toggle {
    font-size: 30px;
    display: none;
}

@media screen and (max-width: 800px) {
    nav {
        display: block;
        position: relative;
        padding: 15px 20px;
    }

    .menu {
        margin-top: 15px;
        display: none;
    }

    .menu.active,
    .toggle {
        display: block;
    }

    .toggle {
        position: absolute;
        top: 15px;
        right: 20px;
    }
}
</style>