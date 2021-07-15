<template>
  <div class="footer">
      <div class="social">
        <img src="@/assets/social-icons/facebook.svg" class="footer-icon"/>
        Rhino-doors
      </div>
      <div class="social">
        <img src="@/assets/social-icons/phone.svg" class="footer-icon"/>
        06-12345678
      </div>
      <div class="social">
        <img src="@/assets/social-icons/house.svg" class="footer-icon"/>
        test straat 123
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";

.footer {
    height: 80px;
    padding: 10px;
    margin-top: 20px;
    background: $main-color;
    color: white;
    text-align: left;

    .footer-icon {
      width: 20px;
      color: white;
      padding-right: 10px;
      padding-bottom: 10px;
    }

    .social {
      display: flex;
      align-items: center;
    }
}
</style>