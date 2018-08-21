<template>
  <footer>
    <div class="links">
      <p class="link-container">
        <span class="footer-caption">Links</span>
        <a href="https://api.stanley.elfstack.com/atom">Feed</a>
        <router-link to="/about">About</router-link>
      </p>

      <p class="link-container">
        <span class="footer-caption">Social Account</span>
        <a href="https://github.com/dodaydream">GitHub</a>
        <a href="https://instagram.com/dodaydream">Instagram</a>
      </p>

      <p class="link-container">
        <span class="footer-caption">External Links</span>
        <a href="http://www.zttofficial.top">ZTT Official</a>
      </p>
    </div>
    <p class="copyright">
      (C) 2015 - 2018 Stanley Cao. All rights reserved unless otherwise noticed
    </p>
  </footer>
</template>

<style scoped>
.links,.copyright {
  font-size: 12px;
}

.link-container a {
  display: block;
}

.copyright {
  padding: 2px 8px;
}

.links {
  padding: 12px 8px;
  background: #fcfafe;
  color: #b57edc;
  border-top: 2px solid #f3eaf9;
  display: flex;
  justify-content: space-between;
}

.copyright {
  background: #f3eaf9;
  color: #b57edc;
}

.footer-caption {
  display: block;
  font-size: 10px;
  line-height: 12px;
}

@media screen and (min-width: 768px)
{
  .links, .copyright {
    font-size: 14px;
    padding: 12px 16px;
  }

  .link-container {
    width: 100px;
    margin-right: 4px;
  }

  .links {
    justify-content: unset;
  }

  .ext-link {
    display: inline;
  }

  .footer-caption {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
