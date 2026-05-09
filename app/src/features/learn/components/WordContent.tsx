"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, FlaskConical, Bot, ArrowRightCircle, Info, Hammer } from "lucide-react";
import { wordData } from "../data/wordData";

export function WordContent() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      <div className="space-y-4 px-4 md:px-0">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-2">
          Microsoft Office Suite
        </Badge>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Word Masterclass <span className="text-primary">Kademix</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Edisi Anatomi Mikroskopis. Pembongkaran total seluruh fungsi tersembunyi hingga ke varian warna, bayangan, dan otomatisasi makro untuk profesional.
        </p>
      </div>

      <Tabs defaultValue="anatomy" className="w-full">
        <div className="px-4 md:px-0 w-full mb-8">
          <div className="w-full overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            <TabsList className="inline-flex w-max min-w-full sm:min-w-0 sm:w-auto h-auto p-1.5 bg-muted/50 rounded-xl md:rounded-2xl gap-2">
              <TabsTrigger value="anatomy" className="py-2.5 md:py-3 px-5 rounded-lg md:rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all text-sm md:text-base font-semibold">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="whitespace-nowrap">Anatomi Total</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="lab" className="py-2.5 md:py-3 px-5 rounded-lg md:rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all text-sm md:text-base font-semibold">
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="whitespace-nowrap">Praktikum (20 Skenario)</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="ai" className="py-2.5 md:py-3 px-5 rounded-lg md:rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md transition-all text-sm md:text-base font-semibold">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="whitespace-nowrap">Integrasi AI Lanjutan</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="anatomy" className="focus-visible:outline-none focus-visible:ring-0 px-4 md:px-0">
          <div className="space-y-12">
            {wordData.anatomy.map((menu, menuIndex) => (
              <div key={menuIndex} className="space-y-6">
                <div className="flex items-center gap-4 border-b border-border/50 pb-3">
                  <span className="flex items-center justify-center bg-primary/10 text-primary h-10 w-10 rounded-xl font-bold text-lg shrink-0">
                    {menuIndex.toString().padStart(2, '0')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {menu.title.replace(/^[0-9]+\.\s*/, '')}
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {menu.groups.map((group, groupIndex) => (
                    <Card key={groupIndex} className="border-border/60 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col bg-card overflow-hidden">
                      <CardHeader className="bg-muted/30 border-b border-border/40 py-4 px-5">
                        <CardTitle className="text-lg font-bold text-primary tracking-tight">{group.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 flex-1 space-y-6">
                        {group.tools.map((tool: any, toolIndex: number) => (
                          <div key={toolIndex} className="space-y-3 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                              <h4 className="font-semibold text-base text-foreground leading-snug">{tool.title}</h4>
                            </div>

                            {tool.variants && tool.variants.length > 0 && (
                              <div className="pl-7 mt-1">
                                {tool.variants.map((v: string, i: number) => (
                                  <p key={i} className="text-sm text-muted-foreground/90 leading-relaxed font-medium">
                                    <span className="text-foreground/60 mr-1.5 font-bold uppercase tracking-wider text-[10px]">Varian:</span>
                                    {v.replace(/Varian:\*?\s*/i, '').replace(/Varian\s*/i, '')}
                                  </p>
                                ))}
                              </div>
                            )}

                            {(tool.kegunaan || tool.caraPakai) && (
                              <div className="ml-7 space-y-3 mt-3">
                                {tool.kegunaan && (
                                  <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      <span className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400">Kegunaan</span>
                                    </div>
                                    <p className="text-sm text-foreground/80 leading-relaxed">{tool.kegunaan}</p>
                                  </div>
                                )}

                                {tool.caraPakai && (
                                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                      <Hammer className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                      <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Cara Pakai</span>
                                    </div>
                                    <p className="text-sm text-foreground/80 leading-relaxed">{tool.caraPakai}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lab" className="focus-visible:outline-none focus-visible:ring-0 px-4 md:px-0">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border/50 py-8 px-6 md:px-8">
              <CardTitle className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Laboratorium Praktikum</CardTitle>
              <CardDescription className="text-base md:text-lg mt-2 text-muted-foreground">
                20 Skenario operasional dunia nyata untuk menguasai Word dari Fundamental hingga Expert.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {wordData.praktikum.map((level, levelIndex) => (
                  <AccordionItem key={levelIndex} value={`level-${levelIndex}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="text-lg md:text-xl font-semibold hover:text-primary hover:no-underline py-5 px-6 md:px-8 bg-card data-[state=open]:bg-muted/10 transition-colors">
                      {level.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/5 px-6 md:px-8 py-6 space-y-6">
                      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {level.scenarios.map((scenario: any, scenarioIndex: number) => (
                          <div key={scenarioIndex} className="bg-background rounded-xl border border-border/60 shadow-sm hover:border-primary/30 transition-colors flex flex-col h-full overflow-hidden">
                            <div className="bg-primary/5 px-5 py-4 border-b border-border/40">
                              <h4 className="font-bold text-foreground text-base md:text-lg flex items-center gap-2">
                                <ArrowRightCircle className="h-5 w-5 text-primary shrink-0" />
                                <span className="leading-snug">{scenario.title}</span>
                              </h4>
                            </div>

                            <div className="p-5 space-y-5 flex-1 flex flex-col">
                              <div className="space-y-4 flex-1">
                                <div className="space-y-1.5">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/40 px-2 py-1 rounded-md">
                                    🎯 Tujuan
                                  </span>
                                  <p className="text-sm font-medium text-foreground leading-relaxed pl-1">{scenario.tujuan}</p>
                                </div>
                                <div className="space-y-1.5">
                                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/40 px-2 py-1 rounded-md">
                                    📝 Skenario
                                  </span>
                                  <p className="text-sm font-medium text-foreground leading-relaxed pl-1">{scenario.skenario}</p>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-border/50 bg-primary/5 -mx-5 px-5 -mb-5 pb-5">
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                  ⚙️ Instruksi Detail
                                </span>
                                <p className="text-sm leading-relaxed text-foreground/90 font-medium whitespace-pre-wrap">{scenario.instruksi}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="focus-visible:outline-none focus-visible:ring-0 px-4 md:px-0">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-3 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 shadow-md">
              <CardHeader className="p-6 md:p-8">
                <CardTitle className="text-2xl md:text-3xl font-extrabold tracking-tight">Standar Industri Kademix 2026</CardTitle>
                <CardDescription className="text-base md:text-lg text-foreground/80 mt-2 max-w-4xl leading-relaxed">
                  Lulusan LPK Kademix dididik menjadi arsitek administratif yang mengatur arus kerja modern antara Cloud, AI, dan Microsoft Office.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
              <CardHeader className="bg-blue-50/50 dark:bg-blue-950/20 border-b border-border/40 p-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5 shadow-sm border border-blue-200">
                  <BookOpen className="text-blue-600 h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Infrastruktur Cloud</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 space-y-5 bg-card">
                <div className="space-y-2">
                  <strong className="text-foreground text-base block font-bold">Google Forms ➡️ Excel ➡️ Word Mail Merge:</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Otomatisasi data peserta dari pendaftaran *online* langsung ke sistem cetak Word Mail Merge tanpa *typo* manusia.</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <strong className="text-foreground text-base block font-bold">Integrasi Notion Hub:</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Panduan operasional tersentralisasi di Workspace Notion, aman dari virus *flashdisk* dan dapat diakses *real-time*.</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <strong className="text-foreground text-base block font-bold">Manajemen Lanjutan PDF:</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Gunakan fitur ekosistem web seperti ILovePDF untuk *Compress*, *Split*, dan *Merge* dokumen laporan secara instan.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
              <CardHeader className="bg-purple-50/50 dark:bg-purple-950/20 border-b border-border/40 p-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5 shadow-sm border border-purple-200">
                  <Bot className="text-purple-600 h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Generative Text AI</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 space-y-5 bg-card">
                <div className="space-y-2">
                  <strong className="text-foreground text-base block font-bold">Draf Dokumen Bisnis (ChatGPT-4o):</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Gunakan prompt AI untuk membangun kerangka SOP atau surat dinas dengan cepat. <b className="text-foreground">(Wajib gunakan *Paste &gt; Keep Text Only*)</b>.</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <strong className="text-foreground text-base block font-bold">Asisten Bawaan (Copilot M365):</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Minta chatbot *built-in* Word untuk menganalisis dokumen panjang dan menyusun ringkasan eksekutif tanpa perlu keluar dari aplikasi.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
              <CardHeader className="bg-green-50/50 dark:bg-green-950/20 border-b border-border/40 p-6">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5 shadow-sm border border-green-200">
                  <CheckCircle2 className="text-green-600 h-7 w-7" />
                </div>
                <CardTitle className="text-xl">Transkripsi & Penerjemah</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 space-y-5 bg-card">
                <div className="space-y-2">
                  <strong className="text-foreground text-base block font-bold">Asisten Tata Bahasa (Grammarly):</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Koreksi otomatis *grammar* tingkat tinggi dan efisiensi frasa untuk korespondensi bahasa Inggris profesional.</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <strong className="text-foreground text-base block font-bold">Translasi Dokumen Utuh (DeepL Pro):</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Terjemahkan dokumen `.docx` ratusan halaman tanpa merusak desain tabel, gambar, atau struktur daftar isinya.</p>
                </div>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <strong className="text-foreground text-base block font-bold">Notulis Rapat Pintar (Otter.ai):</strong>
                  <p className="text-sm text-muted-foreground leading-relaxed">Biarkan bot merekam hasil rapat secara transkripsi cerdas, lalu salin poin utamanya ke templat notula Word Anda.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
