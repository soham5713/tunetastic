"use client"

import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, X, GripVertical, Plus } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useNavigate } from "react-router-dom"

const SortableItem = ({ id, song, currentSong, isPlaying, playSong, togglePlay, removeFromQueue }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-2 mb-2 rounded-md ${
        currentSong?.id === song.id ? "bg-accent" : "bg-background hover:bg-accent/50"
      }`}
      {...attributes}
    >
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="cursor-grab" {...listeners}>
          <GripVertical className="h-4 w-4" />
        </Button>
        <img src={song.coverUrl || "/placeholder.svg"} alt={song.title} className="w-10 h-10 rounded-md" />
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{song.title}</p>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => (currentSong?.id === song.id ? togglePlay() : playSong(song))}
        >
          {currentSong?.id === song.id && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => removeFromQueue(song.id)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}

const Queue = () => {
  const { queue, currentSong, isPlaying, playSong, togglePlay, removeFromQueue, reorderQueue } = usePlayer()
  const navigate = useNavigate()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = queue.findIndex((item) => item.id === active.id)
      const newIndex = queue.findIndex((item) => item.id === over.id)
      reorderQueue(oldIndex, newIndex)
    }
  }

  return (
    <div className="w-[400px] bg-background border border-border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold p-4 border-b border-border">Queue</h2>
      <ScrollArea className="h-[400px]">
        {queue.length > 0 ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={queue.map((song) => song.id)} strategy={verticalListSortingStrategy}>
              <ul className="p-2">
                {queue.map((song) => (
                  <SortableItem
                    key={song.id}
                    id={song.id}
                    song={song}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    playSong={playSong}
                    togglePlay={togglePlay}
                    removeFromQueue={removeFromQueue}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-muted-foreground mb-4">Your queue is empty. Add some songs to get started!</p>
            <Button onClick={() => navigate("/library")} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Songs to Queue
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default Queue

