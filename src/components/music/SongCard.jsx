import { usePlayer } from "../hooks/usePlayer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Plus, Check } from "lucide-react"

const SongCard = ({ song, isSelected, onToggle }) => {
  const { playSong } = usePlayer()

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={song.coverUrl || "/placeholder.svg"}
            alt={song.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-grow overflow-hidden">
            <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => playSong(song)}
              className="text-primary hover:text-primary-foreground hover:bg-primary"
            >
              <Play size={20} />
            </Button>
            <Button
              size="icon"
              variant={isSelected ? "default" : "outline"}
              onClick={onToggle}
              className={isSelected ? "bg-primary text-primary-foreground" : ""}
            >
              {isSelected ? <Check size={20} /> : <Plus size={20} />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SongCard

