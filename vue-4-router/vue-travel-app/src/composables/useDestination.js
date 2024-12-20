import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const cachedData = new Map()
const destination = ref(null)
const experiencesArr = ref([])
const experience = ref(null)

export function useDestination() {
  const route = useRoute()
  const router = useRouter()

  const initData = async () => {
    const slug = route.params.slug
    const experienceSlug = route.params.experienceSlug

    if (cachedData.has(slug)) {
      console.log('Using cached data')
      const data = cachedData.get(slug)
      destination.value = data
      experiencesArr.value = data.experiences
      experience.value = experiencesArr.value.find((el) => el.slug === experienceSlug)
      return
    }

    console.log('Fetching new data')
    const response = await fetch(`https://travel-dummy-api.netlify.app/${slug}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch destination data: ${response.status}`)
    }
    const data = await response.json()
    cachedData.set(slug, data)
    destination.value = data
    experiencesArr.value = data.experiences
    experience.value = experiencesArr.value.find((el) => el.slug === experienceSlug)
  }

  const fetchCountryData = async () => {
    try {
      await initData()
    } catch (err) {
      destination.value = null
      await router.push({ path: '/notFound' })
      console.log('ERROR FETCHING ---', err)
    }
  }

  return {
    destination,
    experiencesArr,
    experience,
    fetchCountryData,
  }
}
