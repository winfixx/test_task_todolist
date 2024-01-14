import { useContext } from 'react'
import { RootStore } from '../stores/RootStore'
import { Store } from '../main'

export const useStores = (): RootStore => useContext(Store)