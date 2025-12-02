<script setup>

import { useCompaniesStore } from '@/stores/company';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const companyStore = useCompaniesStore();
const router = useRouter();

onMounted(async() => {
  companyStore.companiesList();
  companyStore.moviesCompanyList();
})

function virgula(produtoras, filme) {
  if (produtoras.slice(0, 3).indexOf(filme) === 2 || produtoras.length === 1) {
    return filme.title;
  }

  else {
    return filme.title + ', ';
  }
}

function openCompany(companyId) {
  router.push({ name: 'CompanyDetails', params: {companyId}});
};


</script>

<template>
  <div class="main">

    <h1>
      Produtoras
    </h1>
    <div>
    <div class="paginas">
      <button class="descer-pagina" @click="companyStore.companiesPageDown()">
        <span class="mdi mdi-chevron-left"></span>
      </button>
      <button class="subir-pagina" @click="companyStore.companiesPageUp()">
        <span class="mdi mdi-chevron-right"></span>
      </button>
    </div>
      <ul>
        <li v-for="company in companyStore.companies" :key="company.id" class="company">
          <div>
            <img :src="`https://image.tmdb.org/t/p/w500/${company.logo_path}`" alt="" class="company-image">
          </div>
          <div class="informacoes">
            <h2 @click="openCompany(company.id)">
              {{ company.name }}
            </h2>
            <h3>Conhecida Por</h3>
            <p>
            <span v-for="movie in company.movies.slice(0, 3)" class="company-movies"
            :style="{ fontSize: company.movies.slice(0, 3).length > 2 ? '0.7rem' : '0.8rem' }">
            {{ company.movies.slice(0, 3).indexOf(movie) === 2 || (company.movies.slice(0, 3).indexOf(movie) === 1 && company.movies.length === 2) || company.movies.length === 1 ? movie.title : movie.title + ', ' }}
          </span>
            </p>
            <div class='informacoes-homepage'>
              <p><a :href="`${company.homepage}`" v-if="company.homepage != ''" style="font-size: 0.75rem ">Site: {{ company.homepage }}</a></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.main {
  padding: 1vw 10vw;
}

.paginas {
  margin: 1.2rem 0;
  display: flex;
}

.paginas button {
  margin-right: 1vw;
  background-color: #F7E9DE;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  padding: 0.15vw 0.3vw;
  transition: 0.3s;

  & span {
    font-size: 1.6rem;
    color: #EECFBA;
  }

  &:hover {
    transition: 0.3s;
    background-color: #edd0bb;

    & span {
      color: #02E563;
      transition: 0.3s;
    }
  }
}

.company-image {
  width: 8.5rem;
  height: auto;
  height: 13rem;
  max-height: 16rem;
  object-fit: contain;
  border-radius: 4%;
  box-shadow: 0 0 0.1vw rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.9s;

  /* &:hover {
    width: 8.5rem;
    height: 12.5rem;
    scale: 1.25;
    transition: 0.9s;
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.3);
  } */
}

.informacoes {
  margin-left: 2vw;
  max-width: 12rem;
  & h2:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}


.informacoes-homepage {
  font-size: 0.9rem;
}

.company {
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.actor-movies {
  text-align: justify;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  align-items: stretch;
  overflow: hidden;
  color: #B2B2B2;
}

h2 {
  font-size: 1.2rem;
  color: #080808;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h3 {
  font-size: 0.9rem;
  margin-bottom: 0.3vw;
  font-weight: normal;
  color: #009440;
}



</style>
