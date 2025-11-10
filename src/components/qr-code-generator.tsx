"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, QrCode } from "lucide-react"
import QRCodeStyling from "qr-code-styling"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QRCodeGenerator() {
  const [inputType, setInputType] = useState<"url" | "text">("url")
  const [inputValue, setInputValue] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [qrColor, setQrColor] = useState("#000000")
  const [qrBgColor, setQrBgColor] = useState("#ffffff")
  const [qrStyle, setQrStyle] = useState<"rounded" | "dots" | "square" | "classy" | "classy-rounded">("rounded")
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dataToEncode = inputValue.trim() || "https://example.com"

    const qrOptions: any = {
      data: dataToEncode,
      width: 300,
      height: 300,
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 4,
      },
      dotsOptions: {
        color: qrColor,
        type: qrStyle,
      },
      backgroundOptions: {
        color: qrBgColor,
      },
      cornersSquareOptions: {
        color: qrColor,
        type: qrStyle === "square" ? "square" : "extra-rounded",
      },
      cornersDotOptions: {
        color: qrColor,
        type: qrStyle === "dots" ? "dot" : "square",
      },
    }

    if (logoPreview) {
      qrOptions.image = logoPreview
    }

    const newQrCode = new QRCodeStyling(qrOptions)
    setQrCode(newQrCode)

    if (qrRef.current) {
      qrRef.current.innerHTML = ""
      newQrCode.append(qrRef.current)
    }
  }, [inputValue, qrColor, qrBgColor, qrStyle, logoPreview])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLogoPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadQRCode = () => {
    if (qrCode) {
      qrCode.download({
        name: "qr-code",
        extension: "png",
      })
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Generate QR Code
          </CardTitle>
          <CardDescription>Create a permanent QR code from a URL or text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={inputType} onValueChange={(v) => setInputType(v as "url" | "text")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="url-input">Website URL</Label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </TabsContent>
            <TabsContent value="text" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Content</Label>
                <Textarea
                  id="text-input"
                  placeholder="Enter any text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
            <h3 className="font-medium text-sm">Customize Style</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="qr-color"
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-bg-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="qr-bg-color"
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qr-style">Dot Style</Label>
              <Select value={qrStyle} onValueChange={(v) => setQrStyle(v as any)}>
                <SelectTrigger id="qr-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="dots">Dots</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="classy">Classy</SelectItem>
                  <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo-upload">Custom Logo (Optional)</Label>
            <div className="flex items-center gap-4">
              <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="flex-1" />
              {logoPreview && (
                <div className="h-12 w-12 rounded border border-border overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload a logo or icon to display in the center of your QR code
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Preview & Download</CardTitle>
          <CardDescription>Your QR code will be permanent and scannable forever</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center min-h-[300px] bg-muted rounded-lg p-8">
            <div ref={qrRef} className="flex items-center justify-center" />
          </div>

          <Button
            onClick={downloadQRCode}
            variant="outline"
            className="w-full bg-transparent"
            disabled={!inputValue.trim()}
          >
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>

          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
            <h4 className="font-medium text-sm text-foreground">Static QR Code</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This QR code is permanent and will work forever. The data is embedded directly into the code, so it
              doesn't rely on any external service or redirect.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
