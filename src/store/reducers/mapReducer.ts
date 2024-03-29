import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { createAppSlice, useRootSelector } from '../storeUtil.ts'

export type DrawMode = 'drawing' | 'deleting' | 'erasing'

export interface MapState {
  objectsHidden: boolean
  sidebarCollapsed: boolean
  isDrawing: boolean
  isErasing: boolean
  drawMode: DrawMode
  drawColor: string
  drawWeight: number
}

const drawColorKey = 'drawColorKey'
const drawWeightKey = 'drawWeightKey'

const initialState: MapState = {
  objectsHidden: true,
  sidebarCollapsed: false,
  isDrawing: false,
  isErasing: false,
  drawMode: 'drawing',
  drawColor: localStorage.getItem(drawColorKey) || 'blue',
  drawWeight: Number(localStorage.getItem(drawWeightKey)) || 4,
}

export const mapSlice = createAppSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapObjectsHidden(state, { payload: hidden }: PayloadAction<boolean>) {
      state.objectsHidden = hidden
    },
    setSidebarCollapsed(state, { payload: collapsed }: PayloadAction<boolean>) {
      state.sidebarCollapsed = collapsed
    },
    setIsDrawing(state, { payload: isDrawing }: PayloadAction<boolean>) {
      state.isDrawing = isDrawing
      if (isDrawing) {
        state.drawMode = 'drawing'
        state.isErasing = false
      }
    },
    setIsErasing(state, { payload: isErasing }: PayloadAction<boolean>) {
      state.isErasing = isErasing
    },
    setDrawMode(state, { payload: drawMode }: PayloadAction<DrawMode>) {
      state.drawMode = drawMode
      state.isErasing = false
    },
    setDrawColor(state, { payload: drawColor }: PayloadAction<string>) {
      state.drawColor = drawColor
      localStorage.setItem(drawColorKey, drawColor)
    },
    setDrawWeight(state, { payload: drawWeight }: PayloadAction<number>) {
      state.drawWeight = drawWeight
      localStorage.setItem(drawWeightKey, drawWeight.toString())
    },
  },
})

export function useMapObjectsHidden(minDelay: number = 0, maxDelay: number = 100) {
  const hidden = useRootSelector((state) => state.map.objectsHidden)
  const [delayedHidden, setDelayedHidden] = useState(true)

  useEffect(() => {
    if (!hidden) setTimeout(() => setDelayedHidden(false), minDelay + Math.random() * maxDelay)
    else setDelayedHidden(true)
  }, [hidden, minDelay, maxDelay])

  return delayedHidden
}

export const mapReducer = mapSlice.reducer

export const {
  setMapObjectsHidden,
  setSidebarCollapsed,
  setIsDrawing,
  setIsErasing,
  setDrawMode,
  setDrawColor,
  setDrawWeight,
} = mapSlice.actions
