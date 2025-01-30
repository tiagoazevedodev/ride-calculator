"use client"

import { useState } from "react"
import { Calculator, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RideCalculator() {
  const [values, setValues] = useState({
    gasolinePrice: 5.89,
    distance: 33,
    consumption: 10,
    people: 2,
    driverDiscount: 20,
  })

  const calculateCosts = () => {
    const totalFuelCost = (values.distance / values.consumption) * values.gasolinePrice
    const costPerPerson = totalFuelCost / values.people
    const driverCost = costPerPerson * (1 - values.driverDiscount / 100)
    const passengerCost = costPerPerson
    const costPerRoute = totalFuelCost / (values.people * 2) // Assuming round trip

    return {
      totalCost: totalFuelCost.toFixed(2),
      driverCost: driverCost.toFixed(2),
      passengerCost: passengerCost.toFixed(2),
      costPerRoute: costPerRoute.toFixed(2),
    }
  }

  const costs = calculateCosts()

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                <CardTitle>Calculadora de Carona</CardTitle>
              </div>
              <ThemeToggle />
            </div>
            <CardDescription>Calcule os custos de carona com base no preço do combustível e distância</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="gasolinePrice">Preço da Gasolina (R$/L)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Preço atual do litro da gasolina no posto de combustível</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="gasolinePrice"
                    type="number"
                    step="0.01"
                    value={values.gasolinePrice}
                    onChange={(e) => setValues({ ...values, gasolinePrice: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="distance">Distância Total (km)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Distância total percorrida em quilômetros (ida e volta)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="distance"
                    type="number"
                    value={values.distance}
                    onChange={(e) => setValues({ ...values, distance: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="consumption">Consumo do Carro (km/L)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Consumo médio do veículo em quilômetros por litro de combustível</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="consumption"
                    type="number"
                    step="0.1"
                    value={values.consumption}
                    onChange={(e) => setValues({ ...values, consumption: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="people">Número de Pessoas</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Número total de pessoas incluindo o motorista</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="people"
                    type="number"
                    min="2"
                    value={values.people}
                    onChange={(e) => setValues({ ...values, people: Number.parseFloat(e.target.value) || 2 })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="driverDiscount">Desconto do Motorista (%)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Desconto aplicado ao motorista considerando tempo e manutenção do veículo
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="driverDiscount"
                    type="number"
                    min="0"
                    max="100"
                    value={values.driverDiscount}
                    onChange={(e) => setValues({ ...values, driverDiscount: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Custo Total (R$)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Custo total do combustível para percorrer a distância completa</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold text-primary">{costs.totalCost}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Custo por Trecho (R$)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Custo por trecho individual (ida ou volta)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold text-primary">{costs.costPerRoute}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Custo Diário por Passageiro (R$)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor diário a ser pago por cada passageiro</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{costs.passengerCost}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label>Custo Diário do Motorista (R$)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Valor diário a ser pago pelo motorista após aplicar o desconto</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{costs.driverCost}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}

