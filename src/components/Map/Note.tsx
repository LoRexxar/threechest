import { memo, useRef, useState } from 'react'
import { Note as NoteType } from '../../code/types.ts'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { divIcon, Popup as LeafletPopup } from 'leaflet'
import { renderToString } from 'react-dom/server'
import { useAppDispatch } from '../../store/hooks.ts'
import { useContextMenu } from '../Common/useContextMenu.ts'
import { Button } from '../Common/Button.tsx'
import { deleteNote, editNote } from '../../store/routesReducer.ts'
import { ContextMenu } from '../Common/ContextMenu.tsx'

interface Props {
  note: NoteType
  index: number
  iconScaling: number
}

function NoteComponent({ note, index, iconScaling }: Props) {
  const dispatch = useAppDispatch()
  const iconSize = iconScaling
  const { contextMenuPosition, onRightClick, onClose } = useContextMenu()
  const [input, setInput] = useState(note.text)
  const [popupOpen, setPopupOpen] = useState(false)
  const popupRef = useRef<LeafletPopup>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Marker
        position={note.position}
        eventHandlers={{
          click: () => inputRef.current?.focus(),
          contextmenu: (e) => {
            onRightClick(e.originalEvent)
            e.originalEvent.stopPropagation()
          },
        }}
        icon={divIcon({
          tooltipAnchor: [20 + (iconScaling - 40) / 2, 0],
          popupAnchor: [90 + (iconScaling - 40) / 2, 30],
          iconSize: [iconSize, iconSize],
          className: 'mob',
          html: renderToString(
            <div
              className="note w-full h-full flex items-center justify-center rounded-full border-black shadow-2xl text-black"
              style={{
                fontSize: iconSize * 0.6,
                borderWidth: iconSize * 0.05,
                background: 'linear-gradient(135deg, #ffd416, #8f7100)',
                boxShadow: 'black 0px 0px 10px 0px',
                textShadow: '-2px 2px 3px rgba(0, 0, 0, 0.3)',
              }}
            >
              {index + 1}
            </div>,
          ),
        })}
      >
        {!popupOpen && (
          <Tooltip
            key={iconScaling}
            direction="right"
            className="no-arrow flex flex-col text-white text-md p-0 bg-transparent rounded-md border-gray-400 min-h-8 min-w-14"
          >
            <div className="absolute w-full h-full bg-slate-800 opacity-85 -z-10 rounded-md" />
            <div className="p-2">{note.text}</div>
          </Tooltip>
        )}
        <Popup
          ref={popupRef}
          className="plain-popup"
          closeButton={false}
          eventHandlers={{ add: () => setPopupOpen(true), remove: () => setPopupOpen(false) }}
        >
          <input
            ref={inputRef}
            autoFocus
            className="p-2 w-full bg-gray-100 fancy min-w-32"
            onKeyDown={(e) => {
              if (e.key === 'Enter') popupRef.current?.close()
            }}
            onChange={(e) => {
              setInput(e.target.value)
              dispatch(editNote({ changes: { text: e.target.value }, noteIndex: index }))
            }}
            value={input}
          />
        </Popup>
      </Marker>
      {contextMenuPosition && (
        <ContextMenu position={contextMenuPosition} onClose={onClose}>
          <Button
            short
            justifyStart
            onClick={(e) => {
              dispatch(deleteNote(index))
              onClose()
              e.stopPropagation()
            }}
          >
            Delete note
          </Button>
        </ContextMenu>
      )}
    </>
  )
}

export const Note = memo(NoteComponent)
