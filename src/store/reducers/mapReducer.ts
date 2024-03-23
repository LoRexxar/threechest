import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { createAppSlice, useRootSelector } from '../storeUtil.ts'
import { savedCollabColorKey } from '../collab/collabReducer.ts'

export interface MapState {
  objectsHidden: boolean
  isDrawing: boolean
  drawColor: string
  drawWeight: number
}

const initialState: MapState = {
  objectsHidden: true,
  isDrawing: false,
  drawColor: localStorage.getItem(savedCollabColorKey) || 'blue',
  drawWeight: 4,
}

export const mapSlice = createAppSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapObjectsHidden(state, { payload: hidden }: PayloadAction<boolean>) {
      state.objectsHidden = hidden
    },
    setIsDrawing(state, { payload: isDrawing }: PayloadAction<boolean>) {
      state.isDrawing = isDrawing
    },
    setDrawColor(state, { payload: drawColor }: PayloadAction<string>) {
      state.drawColor = drawColor
    },
  },
})

export function useMapObjectsHidden(minDelay: number = 0, maxDelay: number = 100) {
  const hidden = useRootSelector((state) => state.map.objectsHidden)
  const [delayedHidden, setDelayedHidden] = useState(hidden)

  useEffect(() => {
    if (!hidden) setTimeout(() => setDelayedHidden(false), minDelay + Math.random() * maxDelay)
    else setDelayedHidden(true)
  }, [hidden, minDelay, maxDelay])

  return delayedHidden
}

export const mapReducer = mapSlice.reducer

export const { setMapObjectsHidden, setIsDrawing, setDrawColor } = mapSlice.actions
