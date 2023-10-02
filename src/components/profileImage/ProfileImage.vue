<template>
  <div>
    <div class="details-profile-photo">
      <img :src="image" alt="pokemon-img" />
    </div>
  </div>
</template>
<script>
export default {
  props: ["image"],
};
</script>

<style scoped>
.details-profile-photo {
  background: linear-gradient(
      0deg,
      rgba(145, 172, 154, 0.2),
      rgba(145, 172, 154, 0.2)
    ),
    url("../../assets/images/brick-wall.webp");
  background-position: center;
  background-size: cover;
  width: 25rem;
  height: 25rem;
  min-width: 25rem;
  min-height: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100rem;
}
.details-profile-photo img {
  transform: scale(2);
}
@media screen and (max-width: 800px) {
  .details-profile-photo {
    min-width: 16rem;
    min-height: 16rem;
    width: 16rem;
    height: 16rem;
  }
  .details-profile-photo img {
    transform: scale(1.2);
  }
}
</style>
