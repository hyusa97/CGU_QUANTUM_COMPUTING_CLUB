import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Gamepad2 } from "lucide-react"

export function FeaturedGame() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Interactive Learning</h2>
        <p className="text-gray-400 mb-8">Learn quantum concepts through fun and engaging games</p>

        <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-fit">
              <Gamepad2 className="h-8 w-8 text-blue-400" />
            </div>
            <CardTitle className="text-white text-xl">Quantum Tic Tac Toe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-sm">
              Experience quantum superposition and entanglement in this mind-bending version of the classic game.
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>• Superposition</span>
              <span>• Entanglement</span>
              <span>• Measurement</span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
