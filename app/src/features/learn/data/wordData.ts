export const wordData = {
  "anatomy": [
    {
      "title": "0. TAMPILAN DASAR (UI/UX) & QUICK ACCESS",
      "groups": [
        {
          "title": "Quick Access Toolbar (Akses Cepat Kiri Atas)",
          "tools": [
            {
              "title": "Customize Quick Access",
              "variants": [
                "Centang:* New, Open, Save (Ctrl+S), Email, Quick Print, Print Preview and Print, Spelling & Grammar, Undo (Batal), Redo (Ulangi), Draw Table, Touch/Mouse Mode (Bagi layar sentuh)."
              ],
              "description": "",
              "kegunaan": "Mempercepat akses ke fitur-fitur yang paling sering digunakan tanpa harus mencari di dalam tab Ribbon.",
              "caraPakai": "Klik tanda panah kecil di pojok kiri atas jendela Word, lalu centang perintah yang ingin ditambahkan (misal: Save, Undo, Print)."
            }
          ]
        }
      ]
    },
    {
      "title": "1. MENU: FILE (Sistem Pusat & Dokumen)",
      "groups": [
        {
          "title": "Info (Informasi & Keamanan Dokumen)",
          "tools": [
            {
              "title": "Protect Document",
              "variants": [
                "Always Open Read-Only (Hanya baca), Encrypt with Password (Wajib sandi), Restrict Editing (Kunci *layout* atau *font*, hanya izinkan isi kolom tertentu), Restrict Access (Berbasis *server* Microsoft), Add a Digital Signature (Tanda tangan digital valid)."
              ],
              "description": "",
              "kegunaan": "Mengamankan dokumen dari akses tak sah atau mencegah perubahan isi dokumen oleh pihak lain.",
              "caraPakai": "Klik tab File > Info > Protect Document. Pilih jenis proteksi yang diinginkan seperti 'Encrypt with Password' lalu masukkan kata sandi."
            },
            {
              "title": "Inspect Document",
              "variants": [
                "Inspect Document (Deteksi *metadata* pembuat, *header* tersembunyi), Check Accessibility (Uji teks untuk *screen reader* tunanetra), Check Compatibility (Uji apakah fitur akan rusak jika dibuka di Word 2007)."
              ],
              "description": "",
              "kegunaan": "Memeriksa dokumen dari informasi pribadi yang tersembunyi, masalah aksesibilitas, atau masalah kompatibilitas sebelum dibagikan.",
              "caraPakai": "Klik tab File > Info > Check for Issues. Pilih 'Inspect Document' lalu jalankan inspeksi."
            }
          ]
        },
        {
          "title": "Print (Manajemen Cetak Fisik)",
          "tools": [
            {
              "title": "Printer",
              "variants": [],
              "description": "",
              "kegunaan": "Mengatur output perangkat keras printer atau menyimpan dokumen dalam bentuk digital (PDF/XPS).",
              "caraPakai": "Klik tab File > Print. Pada dropdown Printer, pilih nama printer yang terhubung atau pilih 'Microsoft Print to PDF'."
            },
            {
              "title": "Print Range",
              "variants": [
                "Print All Pages, Print Selection (Hanya cetak blok teks aktif), Print Current Page (Cetak layar aktif), Custom Print (Cetak hal: 1, 3, 5-10)."
              ],
              "description": "",
              "kegunaan": "Menentukan halaman mana saja yang akan dicetak untuk menghemat kertas.",
              "caraPakai": "Di menu Print, klik 'Print All Pages' untuk mengubahnya menjadi 'Print Custom Range', lalu ketik nomor halaman (misal: 1, 3, 5-10)."
            },
            {
              "title": "Print Sided",
              "variants": [
                "Print One Sided (1 sisi), Print on Both Sides - Flip on Long Edge (Bolak-balik halaman buku), Flip on Short Edge (Bolak-balik *notes* atas)."
              ],
              "description": "",
              "kegunaan": "Mencetak dokumen di satu sisi kertas atau bolak-balik (Duplex) untuk menghemat kertas.",
              "caraPakai": "Di menu Print, klik dropdown 'Print One Sided' lalu ubah menjadi 'Print on Both Sides' (Flip on long edge untuk buku)."
            },
            {
              "title": "Collated",
              "variants": [
                "Collated (Per bundel: 123, 123), Uncollated (Per halaman: 111, 222)."
              ],
              "description": "",
              "kegunaan": "Mengatur urutan cetakan saat mencetak beberapa rangkap dokumen (misal: 1-2-3 berulang atau 1-1-1, 2-2-2).",
              "caraPakai": "Di menu Print, biarkan opsi 'Collated' aktif agar hasil cetakan tersusun rapi per bundel dokumen."
            },
            {
              "title": "Orientation & Size",
              "variants": [],
              "description": "",
              "kegunaan": "Mengatur orientasi arah kertas (Portrait/Tegak vs Landscape/Melebar) dan memilih dimensi ukuran kertas cetak standar.",
              "caraPakai": "Buka tab Layout. Klik Orientation untuk mengubah arah. Klik Size lalu pilih 'More Paper Sizes' jika ingin menentukan lebar/tinggi secara manual (misal kertas F4 Indonesia)."
            },
            {
              "title": "Pages Per Sheet",
              "variants": [
                "1, 2, 4, 6, 8, 16 Pages Per Sheet (Mencetak 16 lembar Word kecil ke dalam 1 lembar kertas A4 fisik)."
              ],
              "description": "",
              "kegunaan": "Mencetak beberapa halaman dokumen ke dalam satu lembar kertas fisik untuk membuat handout atau contekan mini.",
              "caraPakai": "Di bagian paling bawah menu Print, klik '1 Page Per Sheet' dan pilih angka kelipatannya (misal 2, 4, 6 Pages Per Sheet)."
            }
          ]
        }
      ]
    },
    {
      "title": "2. MENU: HOME (Pemformatan Dasar & Kustomisasi Mikro)",
      "groups": [
        {
          "title": "Clipboard (Papan Klip)",
          "tools": [
            {
              "title": "Paste",
              "variants": [
                "Keep Source Formatting (Pertahankan *font*, ukuran, dan latar warna asli web), Merge Formatting (Gunakan *font* kita, tapi tebal/miring tetap bawaan), Keep Text Only (Teks polos murni)."
              ],
              "description": "",
              "kegunaan": "Menempelkan teks, gambar, atau elemen lain yang sudah di-copy dari tempat lain.",
              "caraPakai": "Tekan Ctrl+V di keyboard, atau klik ikon Paste di tab Home. Gunakan panah bawah Paste untuk memilih opsi 'Keep Text Only' agar format asli tidak ikut terbawa."
            },
            {
              "title": "Format Painter",
              "variants": [],
              "description": "",
              "kegunaan": "Menyalin gaya desain (warna, ukuran, font) dari satu teks dan menerapkannya secara instan ke teks lain.",
              "caraPakai": "Blok teks dengan gaya yang diinginkan, klik ikon kuas 'Format Painter' 1x, lalu blok teks tujuan. Klik ganda (2x) jika ingin menerapkannya berkali-kali."
            }
          ]
        },
        {
          "title": "Font (Tipografi Tingkat Lanjut)",
          "tools": [
            {
              "title": "Font Type",
              "variants": [],
              "description": "",
              "kegunaan": "Mengubah jenis huruf agar sesuai dengan standar dokumen (misal: Times New Roman untuk formal, Arial untuk modern).",
              "caraPakai": "Blok teks, klik tab Home, lalu pilih jenis huruf dari dropdown kotak nama Font."
            },
            {
              "title": "Font Size",
              "variants": [
                "*Dropdown* angka genap (8, 9, 10... 72). *Cara Pakai Custom:* Bisa diketik manual (Misal: 11.5 atau 125)."
              ],
              "description": "",
              "kegunaan": "Membesarkan atau mengecilkan teks agar mudah dibaca atau untuk membedakan judul dengan isi.",
              "caraPakai": "Blok teks, klik tab Home, dan pilih angka dari dropdown kotak ukuran Font. Anda juga bisa mengetik angka spesifik (misal: 11.5) lalu tekan Enter."
            },
            {
              "title": "Increase & Decrease Font Size",
              "variants": [],
              "description": "",
              "kegunaan": "Memperbesar atau memperkecil teks secara bertahap tanpa harus memilih angka.",
              "caraPakai": "Blok teks, lalu klik ikon huruf 'A' besar bertanda panah atas/bawah di tab Home."
            },
            {
              "title": "Change Case",
              "variants": [
                "Sentence case (Kapital awal kalimat), lowercase (kecil semua), UPPERCASE (KAPITAL SEMUA), Capitalize Each Word (Besar Di Tiap Awal Kata), tOGGLE cASE (Kecil di awal, besar di belakang)."
              ],
              "description": "",
              "kegunaan": "Mengubah format kapitalisasi huruf (huruf besar/kecil) tanpa harus mengetik ulang.",
              "caraPakai": "Blok teks, klik ikon 'Aa' di tab Home, lalu pilih opsi seperti UPPERCASE (kapital semua) atau Capitalize Each Word."
            },
            {
              "title": "Clear All Formatting",
              "variants": [],
              "description": "",
              "kegunaan": "Menghapus seluruh gaya, warna, dan efek pada teks, mengembalikannya ke format standar awal.",
              "caraPakai": "Blok teks yang berantakan, lalu klik ikon huruf 'A' yang dilengkapi gambar penghapus warna pink di tab Home."
            },
            {
              "title": "Bold",
              "variants": [],
              "description": "",
              "kegunaan": "Menebalkan, memiringkan, atau mencoret teks untuk memberikan penekanan khusus.",
              "caraPakai": "Blok teks, lalu tekan ikon 'B', 'I', atau 'ab' di tab Home, atau gunakan jalan pintas Ctrl+B dan Ctrl+I."
            },
            {
              "title": "Underline",
              "variants": [
                "Single line, Double line, Thick line, Dotted (Titik-titik), Dashed (Garis putus), Wave (Gelombang), Underline Color (Mewarnai garis bawahnya saja tanpa mewarnai teksnya)."
              ],
              "description": "",
              "kegunaan": "Memberikan garis bawah pada teks dengan berbagai gaya garis.",
              "caraPakai": "Blok teks, tekan ikon 'U' di tab Home (Ctrl+U). Klik panah di sebelahnya untuk memilih gaya garis seperti putus-putus atau bergelombang."
            },
            {
              "title": "Subscript",
              "variants": [],
              "description": "",
              "kegunaan": "Membuat teks berukuran kecil di bawah garis (Subscript) atau di atas garis (Superscript) untuk rumus kimia dan matematika.",
              "caraPakai": "Blok angka atau huruf, lalu klik ikon 'X₂' untuk posisi bawah (H₂O) atau ikon 'X²' untuk posisi atas (m²)."
            },
            {
              "title": "Text Effects and Typography",
              "variants": [
                "Outline (Warna garis luar), Shadow (Bayangan luar/dalam/perspektif), Reflection (Pantulan cermin), Glow (Pendar cahaya neon di belakang teks)."
              ],
              "description": "",
              "kegunaan": "Memberikan efek visual estetis tingkat lanjut seperti bayangan, pendaran neon, atau pantulan pada teks.",
              "caraPakai": "Blok teks, klik ikon 'A' berbayang biru di tab Home, lalu pilih kombinasi efek Shadow, Reflection, atau Glow."
            },
            {
              "title": "Text Highlight Color",
              "variants": [
                "15 Palet Warna Dasar (Kuning, Hijau Terang, Cyan, dll), No Color (Hapus stabilo)."
              ],
              "description": "",
              "kegunaan": "Memberikan warna stabilo pada latar belakang teks tertentu untuk menandai bagian penting.",
              "caraPakai": "Blok teks, klik ikon pensil dengan garis warna (ab) di tab Home. Pilih warna dari dropdown."
            },
            {
              "title": "Font Color",
              "variants": [
                "Automatic (Hitam/Putih menyesuaikan *Dark Mode*), Theme Colors, Standard Colors, More Colors (Kustom HEX/RGB Code), Gradient (Teks warna gradasi terang-gelap)."
              ],
              "description": "",
              "kegunaan": "Mengubah warna huruf secara spesifik.",
              "caraPakai": "Blok teks, klik ikon 'A' dengan garis merah di tab Home, lalu pilih palet warna. Anda dapat memilih 'Gradient' untuk warna gradasi."
            }
          ]
        },
        {
          "title": "Paragraph (Tata Letak)",
          "tools": [
            {
              "title": "Bullets",
              "variants": [
                "Titik, Lingkaran kosong, Kotak, Centang, Tanda panah. Define New Bullet (Memasukkan gambar Logo Kademix sebagai titik *bullet*)."
              ],
              "description": "",
              "kegunaan": "Membuat daftar rincian menggunakan simbol titik, lingkaran, atau ikon agar terlihat rapi.",
              "caraPakai": "Blok daftar paragraf, klik ikon bergaris dengan titik di tab Home. Gunakan 'Define New Bullet' untuk menggunakan foto logo sebagai titik."
            },
            {
              "title": "Numbering",
              "variants": [
                "1., 1), I., i., A., a., a). Set Numbering Value (Memulai penomoran dari angka spesifik, misal mulai dari angka 15)."
              ],
              "description": "",
              "kegunaan": "Membuat daftar urutan menggunakan angka atau abjad otomatis.",
              "caraPakai": "Blok daftar paragraf, klik ikon bergaris angka (1,2,3) di tab Home. Gunakan 'Set Numbering Value' jika ingin memulai daftar dari nomor tertentu."
            },
            {
              "title": "Multilevel List",
              "variants": [
                "1, 1.1, 1.1.1. Atau Bab 1, Pasal 1.1, Ayat 1.1.1. (Wajib untuk dokumen perjanjian/hukum)."
              ],
              "description": "",
              "kegunaan": "Membuat daftar berjenjang (Bab, Pasal, Ayat) secara otomatis dengan format yang terstruktur.",
              "caraPakai": "Klik ikon Multilevel List di tab Home, pilih gaya penomoran berjenjang (1., 1.1, 1.1.1), lalu gunakan tombol Tab di keyboard untuk menurunkan jenjang."
            },
            {
              "title": "Decrease & Increase Indent",
              "variants": [],
              "description": "",
              "kegunaan": "Menggeser posisi menjorok seluruh blok paragraf ke kiri atau ke kanan.",
              "caraPakai": "Taruh kursor di paragraf, lalu klik ikon baris dengan panah biru ke kiri/kanan di tab Home."
            },
            {
              "title": "Sort",
              "variants": [
                "Urutkan teks/angka berdasar Ascending (Kecil ke Besar / A ke Z) atau Descending (Z ke A). Opsi Header row (Agar judul tabel tidak ikut terurut)."
              ],
              "description": "",
              "kegunaan": "Mengurutkan teks atau tabel secara alfabet (A-Z) atau angka (Terkecil ke Terbesar).",
              "caraPakai": "Blok daftar teks atau isi tabel, klik ikon 'A-Z' bertanda panah ke bawah, lalu pilih opsi 'Ascending' atau 'Descending'."
            },
            {
              "title": "Show/Hide ¶",
              "variants": [],
              "description": "",
              "kegunaan": "Menampilkan simbol karakter tak kasat mata (seperti spasi, enter, tab) untuk keperluan audit kerapian dokumen.",
              "caraPakai": "Klik ikon '¶' (Pilcrow) di tab Home. Tanda titik akan merepresentasikan spasi, dan panah merepresentasikan tombol Tab."
            },
            {
              "title": "Alignment",
              "variants": [
                "Align Left (Kiri), Center (Tengah), Align Right (Kanan), Justify (Rata kiri-kanan)."
              ],
              "description": "",
              "kegunaan": "Mengatur rataan paragraf: rata kiri, rata tengah, rata kanan, atau rata kiri-kanan (Justify).",
              "caraPakai": "Klik area paragraf, lalu klik salah satu ikon garis perataan di tab Home atau tekan pintasan Ctrl+L, Ctrl+E, Ctrl+R, Ctrl+J."
            },
            {
              "title": "Line and Paragraph Spacing",
              "variants": [
                "Angka:* 1.0, 1.15, 1.5, 2.0, 2.5, 3.0.",
                "Jarak Paragraf:* Add Space Before Paragraph (Beri jarak atas), Remove Space After Paragraph (Hapus jarak kosong bolong antar *Enter*)."
              ],
              "description": "",
              "kegunaan": "Mengatur jarak regangan spasi antar baris dan jarak kosong (rongga) antar paragraf.",
              "caraPakai": "Blok paragraf, klik ikon garis dan panah atas/bawah. Pilih angka 1.5 untuk spasi standar. Gunakan opsi 'Remove Space' untuk menghilangkan rongga kosong berlebih."
            },
            {
              "title": "Shading",
              "variants": [],
              "description": "",
              "kegunaan": "Memberikan warna blok padat pada latar belakang paragraf atau sel tabel (margin-to-margin).",
              "caraPakai": "Blok paragraf, klik ikon ember cat di tab Home, lalu pilih warna dari palet."
            },
            {
              "title": "Borders",
              "variants": [
                "Bottom, Top, Left, Right, No Border (Sangat berguna menghilangkan garis tabel Excel di Word), All Borders, Outside Borders, View Gridlines (Melihat garis tabel yang disembunyikan)."
              ],
              "description": "",
              "kegunaan": "Memberikan garis bingkai di sekeliling paragraf atau tabel.",
              "caraPakai": "Blok area teks, klik ikon kotak bergaris putus di tab Home. Pilih 'All Borders' untuk memunculkan tabel, atau 'No Border' untuk menyembunyikannya."
            }
          ]
        },
        {
          "title": "Styles (Hierarki Struktur)",
          "tools": [
            {
              "title": "Style Gallery",
              "variants": [
                "Mutlak:* Normal (Teks biasa), No Spacing, Heading 1 (Judul Bab), Heading 2 (Sub-Bab), Title, Subtitle, Quote (Kutipan blok). *Wajib diaplikasikan untuk merender Daftar Isi otomatis.*"
              ],
              "description": "",
              "kegunaan": "Memberikan hierarki kerangka struktural pada dokumen (Judul, Sub-Bab) yang wajib digunakan agar Daftar Isi otomatis bisa dibuat.",
              "caraPakai": "Blok teks judul, lalu klik 'Heading 1' di area kotak Styles tab Home. Untuk sub-judul, blok teks lalu klik 'Heading 2'."
            }
          ]
        },
        {
          "title": "Editing",
          "tools": [
            {
              "title": "Find",
              "variants": [],
              "description": "",
              "kegunaan": "Mencari kata, frasa, atau bagian spesifik secara cepat di dalam dokumen panjang.",
              "caraPakai": "Tekan Ctrl+F, ketik kata yang dicari di kotak Navigation panel kiri."
            },
            {
              "title": "Replace",
              "variants": [],
              "description": "",
              "kegunaan": "Mencari kata spesifik dan menggantinya dengan kata lain secara massal (ke seluruh dokumen sekaligus).",
              "caraPakai": "Tekan Ctrl+H. Ketik kata lama di kotak 'Find what', ketik kata baru di kotak 'Replace with', lalu klik 'Replace All'."
            },
            {
              "title": "Select",
              "variants": [
                "Select All (Ctrl+A), Select Objects (Kursor panah khusus menyeleksi gambar yang tertumpuk di belakang tulisan)."
              ],
              "description": "",
              "kegunaan": "Memblok seluruh teks atau memilih objek yang bertumpuk (seperti gambar yang berada di belakang teks).",
              "caraPakai": "Klik tombol 'Select' di ujung kanan tab Home, lalu pilih 'Select All' (Ctrl+A) atau 'Select Objects' untuk mengaktifkan kursor seleksi gambar."
            }
          ]
        }
      ]
    },
    {
      "title": "3. MENU: INSERT (Penyisipan Objek Visual & Navigasi)",
      "groups": [
        {
          "title": "Pages & Tables",
          "tools": [
            {
              "title": "Pages",
              "variants": [
                "Cover Page (Pilih 15+ desain sampul otomatis Microsoft), Blank Page (Halaman kosong), Page Break (Memaksa teks turun ke halaman baru tanpa Enter)."
              ],
              "description": "",
              "kegunaan": "Menyisipkan halaman kosong, halaman sampul profesional, atau memutus alur teks ke halaman baru secara paksa.",
              "caraPakai": "Buka tab Insert. Klik 'Cover Page' untuk sampul, atau tekan Ctrl+Enter untuk fungsi 'Page Break' yang jauh lebih rapi dibanding menekan Enter berkali-kali."
            },
            {
              "title": "Table",
              "variants": [
                "Insert Table (Blok area maksimum 10x8), Insert Table... (Ketik manual, misal 50 kolom x 100 baris), Draw Table (Pensil untuk mencoret belah sel tabel), Convert Text to Table (Ubah teks koma menjadi tabel), Excel Spreadsheet (Menanamkan MS Excel mini yang berfungsi penuh ke dalam Word)."
              ],
              "description": "",
              "kegunaan": "Menyisipkan tabel bergrid untuk menyajikan data terstruktur, atau mengintegrasikan lembar kerja Excel mini langsung di dalam Word.",
              "caraPakai": "Buka tab Insert > Table. Blok jumlah sel yang diinginkan, atau pilih 'Excel Spreadsheet' jika Anda butuh fungsi perhitungan rumus Excel di dalam Word."
            }
          ]
        },
        {
          "title": "Illustrations",
          "tools": [
            {
              "title": "Pictures",
              "variants": [
                "This Device, Stock Images, Online Pictures. (Sangat krusial: Gunakan fitur Wrap Text di gambar menjadi Square agar gambar dikelilingi teks, atau Behind Text sebagai *background*)."
              ],
              "description": "",
              "kegunaan": "Menyisipkan gambar visual dari file komputer atau internet.",
              "caraPakai": "Buka tab Insert > Pictures > This Device. Setelah gambar masuk, sangat krusial untuk mengeklik ikon lengkung di samping gambar (Wrap Text) dan pilih opsi 'Square' atau 'In Front of Text' agar gambar bisa digeser bebas."
            },
            {
              "title": "Shapes",
              "variants": [
                "Lines, Rectangles, Basic Shapes, Block Arrows, Flowchart, Callouts."
              ],
              "description": "",
              "kegunaan": "Menyisipkan objek bentuk dasar seperti garis, kotak, panah, atau diagram flowchart.",
              "caraPakai": "Buka tab Insert > Shapes. Klik bentuk yang diinginkan, lalu klik dan tahan mouse sambil menarik di area kertas untuk menggambar bentuknya."
            },
            {
              "title": "Icons & 3D Models",
              "variants": [],
              "description": "",
              "kegunaan": "Menambahkan ikon vektor profesional dan objek 3 dimensi yang bisa diputar posisinya.",
              "caraPakai": "Buka tab Insert > Icons. Cari kata kunci (misal: komputer), pilih ikon, lalu klik Insert."
            },
            {
              "title": "SmartArt",
              "variants": [
                "Bagan:* List, Process, Cycle, Hierarchy (Bagan Struktur Organisasi otomatis), Relationship, Matrix, Pyramid."
              ],
              "description": "",
              "kegunaan": "Membuat bagan visual, siklus proses, atau struktur organisasi perusahaan secara otomatis dan rapi tanpa harus menyusun satu per satu kotak.",
              "caraPakai": "Buka tab Insert > SmartArt. Pilih tipe (misal: Hierarchy), lalu ketik nama jabatan di jendela panel teks yang muncul."
            },
            {
              "title": "Chart",
              "variants": [
                "Column (Batang), Line (Garis), Pie (Lingkaran), Bar, Area, X Y Scatter, Map. (Otomatis membuka Excel terintegrasi untuk input angka)."
              ],
              "description": "",
              "kegunaan": "Menyisipkan grafik analitik (batang, garis, lingkaran) yang terhubung langsung dengan jendela data Excel.",
              "caraPakai": "Buka tab Insert > Chart. Pilih tipe grafik. Jendela Excel mini akan terbuka otomatis, ubah angka data di tabel Excel tersebut, lalu tutup Excel-nya."
            },
            {
              "title": "Screenshot",
              "variants": [],
              "description": "",
              "kegunaan": "Menangkap cuplikan layar aplikasi lain yang sedang terbuka di komputer secara instan.",
              "caraPakai": "Buka tab Insert > Screenshot. Pilih 'Screen Clipping', lalu blok area layar yang ingin dicuplik."
            }
          ]
        },
        {
          "title": "Links & Comments",
          "tools": [
            {
              "title": "Link",
              "variants": [
                "Existing File or Web Page (Buka web), Place in This Document (Lompat ke bab lain), Create New File, E-mail Address."
              ],
              "description": "",
              "kegunaan": "Menautkan teks ke alamat website, file komputer lain, atau ke halaman/bab lain dalam dokumen yang sama.",
              "caraPakai": "Blok teks yang akan dijadikan tombol, tekan Ctrl+K, lalu tempel alamat URL di kolom Address."
            },
            {
              "title": "Bookmark & Cross-reference",
              "variants": [],
              "description": "",
              "kegunaan": "Memberi tanda buku virtual pada teks dan membuat rujukan silang (seperti teks otomatis 'Lihat Tabel 5' yang posisinya akan update jika tabel bergeser).",
              "caraPakai": "Blok teks tabel, klik Bookmark untuk menandai. Di tempat lain, gunakan Cross-reference untuk merujuk ke Bookmark tersebut."
            }
          ]
        },
        {
          "title": "Header & Footer (Kepala/Kaki Kertas)",
          "tools": [
            {
              "title": "Header / Footer",
              "variants": [
                "Opsi Pita atas saat aktif:* Different First Page (Halaman Sampul bersih, Kop Surat dimulai di Halaman 2), Different Odd & Even Pages (Posisi ganjil genap beda untuk buku cetak)."
              ],
              "description": "",
              "kegunaan": "Membuat Kop Surat di area margin atas atau catatan kaki berulang di area margin bawah yang akan muncul di semua halaman.",
              "caraPakai": "Klik ganda (2x) bagian paling atas atau bawah margin kertas. Ketik teks kop surat. Centang opsi 'Different First Page' jika halaman pertama tidak ingin memiliki Header."
            },
            {
              "title": "Page Number",
              "variants": [
                "Posisi:* Top of Page, Bottom of Page, Page Margins, Current Position.",
                "Format Page Numbers:* Format 1, 2, 3 atau a, b, c atau i, ii, iii. Pengaturan Start at (Memulai halaman dari angka khusus)."
              ],
              "description": "",
              "kegunaan": "Memberikan penomoran halaman otomatis secara terurut.",
              "caraPakai": "Buka tab Insert > Page Number. Pilih posisi nomor (Top/Bottom). Gunakan menu 'Format Page Numbers' untuk mengganti format (1,2,3 ke i,ii,iii) atau mengatur nomor awalan."
            }
          ]
        },
        {
          "title": "Text & Symbols",
          "tools": [
            {
              "title": "Text Box",
              "variants": [
                "Simple Text Box, Draw Text Box (Kotak terbang bebas. *Cara pakai:* Di menu Shape Format, pilih Shape Outline > No Outline agar kotak terlihat transparan menyatu dengan dokumen)."
              ],
              "description": "",
              "kegunaan": "Membuat kotak berisi teks yang bisa diletakkan dan digeser secara melayang bebas di mana saja pada kertas.",
              "caraPakai": "Buka tab Insert > Text Box > Draw Text Box. Gambar kotaknya. Untuk membuatnya menyatu, masuk ke tab Shape Format dan pilih Shape Outline > No Outline."
            },
            {
              "title": "Drop Cap",
              "variants": [
                "Dropped (Huruf kapital awal memakan 3 baris paragraf), In margin (Huruf kapital awal berada di luar penggaris)."
              ],
              "description": "",
              "kegunaan": "Membuat huruf pertama dalam suatu paragraf menjadi besar (seperti dalam desain majalah atau koran).",
              "caraPakai": "Letakkan kursor di huruf pertama paragraf, buka tab Insert > Drop Cap, lalu pilih gaya 'Dropped'."
            },
            {
              "title": "Equation & Symbol",
              "variants": [
                "Equation:* Area of Circle, Binomial Theorem, Fractions (Pecahan), Radical (Akar kuadrat).",
                "Symbol:* More Symbols (Cari lambang Hak Cipta ©, Centang ☑, Alpha α)."
              ],
              "description": "",
              "kegunaan": "Menyisipkan rumus matematika rumit (pecahan, akar, matriks) dan simbol khusus (hak cipta, alfa, beta).",
              "caraPakai": "Buka tab Insert > Equation untuk mengetik rumus fraksional/akar. Buka Insert > Symbol > More Symbols untuk mencari karakter khusus."
            }
          ]
        }
      ]
    },
    {
      "title": "4. MENU: DESIGN & LAYOUT (Arsitektur Kertas Fisik)",
      "groups": [
        {
          "title": "Document Formatting (Design)",
          "tools": [
            {
              "title": "Themes & Style Sets",
              "variants": [],
              "description": "",
              "kegunaan": "Mengubah palet warna dasar, set font, dan gaya efek secara serempak ke seluruh halaman hanya dalam satu kali klik.",
              "caraPakai": "Buka tab Design, lalu klik Themes dan pilih kombinasi yang diinginkan."
            }
          ]
        },
        {
          "title": "Page Background (Design)",
          "tools": [
            {
              "title": "Watermark",
              "variants": [
                "Confidential, Custom Watermark (Pilih Picture untuk logo transparan / Text untuk teks \"DRAFT\")."
              ],
              "description": "",
              "kegunaan": "Memberikan cap air pudar di belakang teks (seperti teks 'DRAFT' atau logo transparan perusahaan) untuk identitas/keamanan dokumen.",
              "caraPakai": "Buka tab Design > Watermark > Custom Watermark. Pilih Text Watermark atau Picture Watermark (untuk memasukkan logo file JPG/PNG)."
            },
            {
              "title": "Page Color & Page Borders",
              "variants": [
                "Borders:* Setting (Box, Shadow, 3D), Style (Garis tunggal/putus/ganda), Color, Width (Ketebalan, misal 3pt), Art (Bingkai estetika untuk ijazah/sertifikat)."
              ],
              "description": "",
              "kegunaan": "Mengubah warna latar kertas secara digital dan memberikan bingkai artistik di sepanjang sisi luar kertas (cocok untuk sertifikat).",
              "caraPakai": "Buka tab Design > Page Borders. Pilih gaya 'Box', tentukan ukuran Width, atau pilih desain 'Art' untuk bingkai sertifikat."
            }
          ]
        },
        {
          "title": "Page Setup (Layout)",
          "tools": [
            {
              "title": "Margins",
              "variants": [
                "Normal, Narrow (Jarak tepi sangat tipis untuk brosur), Moderate, Wide, Custom Margins (Setelan khusus Skripsi: Top 4cm, Left 4cm, Bottom 3cm, Right 3cm)."
              ],
              "description": "",
              "kegunaan": "Menentukan batas area putih kosong di sekeliling pinggiran kertas agar cetakan tidak terpotong printer.",
              "caraPakai": "Buka tab Layout > Margins. Pilih 'Custom Margins' untuk mengatur jarak Top, Bottom, Left, dan Right secara presisi dalam satuan sentimeter."
            },
            {
              "title": "Orientation & Size",
              "variants": [
                "Orientasi:* Portrait (Tegak), Landscape (Melebar).",
                "Ukuran:* A4, Letter, Legal, More Paper Sizes (Custom F4 Indonesia: Lebar 21.5cm x Tinggi 33cm)."
              ],
              "description": "",
              "kegunaan": "Mengatur orientasi arah kertas (Portrait/Tegak vs Landscape/Melebar) dan memilih dimensi ukuran kertas cetak standar.",
              "caraPakai": "Buka tab Layout. Klik Orientation untuk mengubah arah. Klik Size lalu pilih 'More Paper Sizes' jika ingin menentukan lebar/tinggi secara manual (misal kertas F4 Indonesia)."
            },
            {
              "title": "Columns",
              "variants": [
                "One, Two, Three, Left (Kiri sempit, kanan lebar), Right."
              ],
              "description": "",
              "kegunaan": "Memecah lajur teks dokumen dari atas ke bawah menjadi beberapa bagian sejajar layaknya koran atau brosur.",
              "caraPakai": "Blok paragraf teks yang ingin dipecah, buka tab Layout > Columns, lalu pilih opsi (misalnya 'Three' untuk lipatan brosur 3 bagian)."
            },
            {
              "title": "Breaks",
              "variants": [
                "Page Breaks:* Page, Column, Text Wrapping.",
                "Section Breaks:* Next Page (DNA Master: Memutus format halaman. Halaman 1 tegak dan Halaman 2 melebar BISA DILAKUKAN dalam 1 file menggunakan fitur ini), Continuous (Memutus kolom di halaman yang sama), Even Page, Odd Page."
              ],
              "description": "",
              "kegunaan": "Memisahkan struktur pemformatan kertas. Fitur 'Section Break' adalah jurus rahasia untuk memisahkan DNA kertas: membuat Halaman 1 tegak, namun Halaman 2 melebar dalam file yang sama.",
              "caraPakai": "Letakkan kursor di bagian paling bawah halaman, buka tab Layout > Breaks > pilih 'Next Page'. Setelah itu, pindah ke halaman baru dan ubah orientasinya. Halaman lama tidak akan terpengaruh."
            }
          ]
        },
        {
          "title": "Paragraph (Layout)",
          "tools": [
            {
              "title": "Indent & Spacing Exact",
              "variants": [],
              "description": "",
              "kegunaan": "Mengatur jarak indentasi (geseran) pinggir dan rongga spasi paragraf dengan pengaturan angka sentimeter spesifik langsung dari panel tanpa masuk ke dialog pop-up.",
              "caraPakai": "Blok paragraf, buka tab Layout, lalu atur angka panah atas/bawah pada kotak Indent (Left/Right) dan Spacing (Before/After)."
            }
          ]
        }
      ]
    },
    {
      "title": "5. MENU: REFERENCES (Sistem Laporan Akademik Kademix)",
      "groups": [
        {
          "title": "Table of Contents",
          "tools": [
            {
              "title": "Table of Contents",
              "variants": [
                "Automatic Table 1, Automatic Table 2, Custom Table of Contents. (Syarat: teks harus di-*Heading* di menu Home)."
              ],
              "description": "",
              "kegunaan": "Membuat Daftar Isi halaman secara otomatis dan akurat sesuai letak nomor halaman terkini.",
              "caraPakai": "Pastikan semua judul bab sudah menggunakan format 'Heading 1' dan 'Heading 2' di tab Home. Pergi ke halaman kosong awal, klik tab References > Table of Contents > Automatic Table 1."
            }
          ]
        },
        {
          "title": "Footnotes",
          "tools": [
            {
              "title": "Insert Footnote",
              "variants": [],
              "description": "",
              "kegunaan": "Menyisipkan catatan kaki di ujung bawah margin dokumen untuk memberikan penjelasan istilah rujukan tanpa mengganggu teks utama.",
              "caraPakai": "Letakkan kursor di samping kata yang ingin dirujuk. Buka tab References > Insert Footnote. Lalu ketik penjelasannya di bawah garis yang otomatis muncul."
            }
          ]
        },
        {
          "title": "Citations & Bibliography",
          "tools": [
            {
              "title": "Insert Citation & Manage Sources",
              "variants": [
                "Style:* APA, Chicago, IEEE, Harvard, MLA. (Menyusun Daftar Pustaka otomatis setelah memasukkan data buku referensi)."
              ],
              "description": "",
              "kegunaan": "Mengelola data buku rujukan, memunculkan kutipan di teks, dan menyusun Daftar Pustaka otomatis sesuai gaya penulisan akademik (seperti format APA).",
              "caraPakai": "Buka tab References. Klik 'Manage Sources' lalu masukkan info buku. Di area teks, klik 'Insert Citation'. Untuk Daftar Pustaka otomatis, klik ikon 'Bibliography'."
            }
          ]
        },
        {
          "title": "Captions",
          "tools": [
            {
              "title": "Insert Caption & Table of Figures",
              "variants": [],
              "description": "",
              "kegunaan": "Memberikan penomoran otomatis pada gambar/tabel (misal: Gambar 1.1) dan merendernya menjadi halaman Daftar Gambar/Daftar Tabel secara otomatis.",
              "caraPakai": "Klik kanan pada gambar > Insert Caption. Nanti, di halaman kosong, buka tab References > Insert Table of Figures untuk membuat daftar otomatisnya."
            }
          ]
        }
      ]
    },
    {
      "title": "6. MENU: MAILINGS (Integrasi Database / Mail Merge)",
      "groups": [
        {
          "title": "Start Mail Merge",
          "tools": [
            {
              "title": "Start Mail Merge",
              "variants": [
                "Tipe Output:* Letters (Surat dinamis), Email Messages, Envelopes (Amplop), Labels (Stiker kode pos)."
              ],
              "description": "",
              "kegunaan": "Memulai proses penyatuan dokumen (merger) massal untuk membuat surat berantai, undangan label otomatis, atau cetakan amplop dari satu desain template utama.",
              "caraPakai": "Buka tab Mailings > Start Mail Merge. Pilih tipe format output yang Anda inginkan (misal: Letters atau Envelopes)."
            },
            {
              "title": "Select Recipients",
              "variants": [
                "Type a New List, Use an Existing List (Pilih *file* Microsoft Excel/Access Database LPK)."
              ],
              "description": "",
              "kegunaan": "Mengimpor pangkalan data (Database) dari sumber eksternal seperti tabel Excel yang berisi ratusan atau ribuan data individu ke dalam Word.",
              "caraPakai": "Buka tab Mailings > Select Recipients > Use an Existing List. Telusuri komputer Anda untuk memilih file Excel atau database pendaftaran siswa Anda."
            }
          ]
        },
        {
          "title": "Write & Insert Fields",
          "tools": [
            {
              "title": "Insert Merge Field",
              "variants": [
                "Memunculkan *dropdown* nama kolom otomatis yang terdeteksi dari Excel (Contoh: «NAMA_PESERTA», «NILAI_UJI»)."
              ],
              "description": "",
              "kegunaan": "Meletakkan parameter nama kolom (variabel dinamis) dari database Excel langsung ke dalam area dokumen Word agar posisinya akurat saat diproduksi massal.",
              "caraPakai": "Letakkan kursor pada area nama yang dikosongkan (misal setelah kata 'Kepada Yth:'), klik tab Mailings > Insert Merge Field, lalu pilih judul kolom (misal 'Nama_Peserta')."
            },
            {
              "title": "Rules",
              "variants": [
                "Opsi Logika:* Ask, Fill-in, If...Then...Else... (Logika otomatis: JIKA Predikat = A, MAKA Cetak \"Sangat Memuaskan\", SELAIN ITU Cetak \"Standar\")."
              ],
              "description": "",
              "kegunaan": "Membuat aturan logika IF-THEN-ELSE canggih di dalam surat yang merubah teks secara otomatis tergantung kriteria data peserta.",
              "caraPakai": "Buka tab Mailings > Rules > If...Then...Else. Set logika kondisi (Contoh: Jika Field Nilai > 80, maka ketik 'LULUS', jika tidak maka ketik 'GAGAL')."
            }
          ]
        },
        {
          "title": "Preview & Finish",
          "tools": [
            {
              "title": "Preview Results",
              "variants": [],
              "description": "",
              "kegunaan": "Melakukan uji coba atau pratinjau live untuk melihat bagaimana variabel kolom di dokumen berubah wujud menjadi data asli peserta sebelum dicetak secara permanen.",
              "caraPakai": "Buka tab Mailings > Preview Results. Klik panah maju/mundur di sebelahnya untuk mengecek lembar nama peserta satu per satu."
            },
            {
              "title": "Finish & Merge",
              "variants": [
                "Edit Individual Documents (Merender ke dokumen Word baru berisi ribuan sertifikat siap PDF), Print Documents (Langsung masuk mesin *Printer*)."
              ],
              "description": "",
              "kegunaan": "Tahapan eksekusi final untuk me-render kode-kode Mail Merge menjadi dokumen-dokumen baru individu dalam jumlah massal, atau langsung dikirimkan ke mesin Printer cetak.",
              "caraPakai": "Buka tab Mailings > Finish & Merge. Pilih 'Edit Individual Documents' untuk menghasilkan ratusan sertifikat dalam satu file Word raksasa baru, lalu simpan."
            }
          ]
        }
      ]
    },
    {
      "title": "7. MENU: REVIEW & VIEW (Audit, Keamanan, & Tata Letak Layar)",
      "groups": [
        {
          "title": "Proofing, Speech, & Language (Review)",
          "tools": [
            {
              "title": "Spelling & Grammar",
              "variants": [],
              "description": "",
              "kegunaan": "Memeriksa dokumen dari kesalahan ketik (typo) dan menyempurnakan struktur tata bahasa (Grammar), sangat efektif untuk korespondensi dokumen berbahasa Inggris.",
              "caraPakai": "Buka tab Review > Spelling & Grammar (atau tekan tombol F7 di keyboard). Word akan menyisir dokumen dan menawarkan koreksi pada setiap garis keriting merah/biru."
            },
            {
              "title": "Word Count",
              "variants": [],
              "description": "",
              "kegunaan": "Menghitung secara presisi rekapitulasi data naskah yang krusial untuk penulisan karya ilmiah: jumlah lembar halaman, total keseluruhan kata, hingga detail perhitungan karakter teks (dengan spasi maupun tanpa spasi).",
              "caraPakai": "Buka tab Review > Word Count, atau klik ganda status jumlah kata yang berada di pojok kiri bawah layar Word Anda."
            },
            {
              "title": "Read Aloud",
              "variants": [],
              "description": "",
              "kegunaan": "Memerintahkan mesin Word untuk membacakan lantang isi teks dokumen Anda dalam wujud suara audio. Berguna untuk mendeteksi kejanggalan kalimat saat proses proofreading audit dokumen tanpa harus membacanya mandiri.",
              "caraPakai": "Buka tab Review > Read Aloud. Gunakan panel kecil yang muncul untuk mengatur kecepatan bicara narator (Reading Speed) atau mengganti karakter suara."
            },
            {
              "title": "Translate",
              "variants": [],
              "description": "",
              "kegunaan": "Melakukan konversi bahasa lintas negara pada suatu dokumen panjang menggunakan mesin komputasi Cloud tanpa merusak format desain letak awal dokumen Anda.",
              "caraPakai": "Buka tab Review > Translate. Pilih opsi 'Translate Selection' untuk menerjemahkan paragraf terblokir, atau 'Translate Document' untuk memproduksi file .docx terjemahan yang baru dan utuh."
            }
          ]
        },
        {
          "title": "Comments & Tracking (Review)",
          "tools": [
            {
              "title": "New Comment",
              "variants": [],
              "description": "",
              "kegunaan": "Meninggalkan catatan digital atau stiker diskusi di bagian pinggir margin dokumen agar tim lain dapat merespon tanpa harus merusak teks asli dokumen utama.",
              "caraPakai": "Blok teks yang ambigu, buka tab Review > New Comment. Ketik instruksi catatan revisi untuk tim di panel samping, lalu klik Reply/Resolve jika masalah sudah tuntas."
            },
            {
              "title": "Track Changes",
              "variants": [
                "Markup:* All Markup, Simple Markup, No Markup."
              ],
              "description": "",
              "kegunaan": "Mengaktifkan mode radar audit, di mana segala bentuk pengeditan, modifikasi, penambahan, penghapusan teks, atau pergeseran tabel akan terekam jelas dan diberikan pewarnaan markup jejak revisi.",
              "caraPakai": "Buka tab Review > Track Changes. Mulai hapus atau ketik teks baru. Teks lama yang Anda hapus akan tercoret merah rapi (Strikethrough markup) dan teks tambahan baru Anda akan digarisbawahi."
            },
            {
              "title": "Accept / Reject",
              "variants": [],
              "description": "",
              "kegunaan": "Mengevaluasi hasil koreksi Track Changes dari anggota tim lain; memutuskan apakah akan menyetujui penerapan revisi tersebut atau menolaknya untuk kembali ke teks aslinya.",
              "caraPakai": "Buka tab Review. Taruh kursor di atas teks yang bercoretan merah, lalu klik tombol 'Accept' untuk mematenkan perubahannya, atau 'Reject' untuk membuang revisi tim Anda."
            }
          ]
        },
        {
          "title": "Protect (Review)",
          "tools": [
            {
              "title": "Restrict Editing",
              "variants": [
                "Limitasi:* Formatting restrictions (Mengunci margin/ukur font), Editing restrictions > Filling in forms (Mengunci teks dan kertas, staf hanya bisa mengetik di kotak formulir kosong yang Anda izinkan)."
              ],
              "description": "",
              "kegunaan": "Membekukan dan mengamankan tata letak/format dokumen Word. Staf atau penerima file hanya diberikan izin mengetik input tulisan di kolom-kolom putih spesifik formulir, sementara teks perjanjian sisanya mustahil dihapus/dimodifikasi.",
              "caraPakai": "Buka tab Review > Restrict Editing. Centang opsi nomor dua (Editing restrictions), atur mode 'Filling in forms', lalu klik 'Yes, Start Enforcing Protection' dan patenkan dengan kata sandi rahasia."
            }
          ]
        },
        {
          "title": "Views & Show (View)",
          "tools": [
            {
              "title": "Views",
              "variants": [
                "Print Layout (Layar kerja standar putih), Read Mode (Mode baca ala tablet), Web Layout."
              ],
              "description": "",
              "kegunaan": "Mengganti sudut pandang interaksi kertas digital Anda; mengubah dari mode halaman kerja (Print Layout) ke mode web memanjang tanpa batas (Web Layout), atau mengaktifkan antarmuka minimalis seperti buku elektronik tablet (Read Mode).",
              "caraPakai": "Buka tab View. Pada area sisi paling kiri Ribbon, pilih mode seperti 'Read Mode' (nyaman dibaca), atau tetap di opsi baku 'Print Layout'."
            },
            {
              "title": "Show",
              "variants": [
                "Centang:* Ruler (Penggaris *margin* atas & kiri), Gridlines (Kotak strimin buku kotak untuk presisi desain gambar), Navigation Pane (Peta Daftar Isi vertikal di kiri layar)."
              ],
              "description": "",
              "kegunaan": "Memunculkan garis-garis asisten maya untuk menjaga tingkat presisi dalam pekerjaan desain di dalam Microsoft Word. (Misal penggaris pembatas sisi atas/kiri atau grid milimeter blok layaknya kertas grafik).",
              "caraPakai": "Buka tab View. Centang kotak 'Ruler' untuk memunculkan panel mistar penggaris batas atas, centang 'Gridlines' untuk memunculkan latar kotak-kotak desain, dan centang panel 'Navigation Pane' untuk memunculkan Peta Daftar Isi."
            }
          ]
        },
        {
          "title": "Zoom & Window (View)",
          "tools": [
            {
              "title": "Zoom",
              "variants": [],
              "description": "",
              "kegunaan": "Mengatur rasio kebesaran kaca pembesar dokumen Word ke layar monitor. Serta mampu menjajarkan beberapa lembar kertas berdampingan dalam satu bentang pandangan agar tidak sering scroll vertikal.",
              "caraPakai": "Buka tab View. Klik 'Multiple Pages' jika Anda menggunakan monitor ekstra lebar dan ingin melihat 3 lembar Word berjajar layaknya album kolase, atau klik ikon '100%' untuk kembali ke titik normal baku."
            },
            {
              "title": "Window",
              "variants": [
                "New Window (Menduplikat layar aktif), Split (Layar terbelah dua horizontal; atas baca hal 1, bawah ngetik hal 10), View Side by Side (Mensejajarkan 2 file Word beda di kiri dan kanan layar secara vertikal)."
              ],
              "description": "",
              "kegunaan": "Memanipulasi dan membelah layar antarmuka Word saat bekerja ekstra, memungkinkan Anda membaca file Halaman 1 dan merekap di Halaman 150 secara serentak tanpa berganti tab aplikasi.",
              "caraPakai": "Buka tab View. Klik tombol 'Split' untuk memotong layar atas dan bawah, atau klik 'View Side by Side' jika ingin mensejajarkan dua jendela dokumen Word yang berbeda ke kiri dan ke kanan untuk perbandingan revisi file komparatif."
            }
          ]
        }
      ]
    }
  ],
  "praktikum": [
    {
      "title": "LEVEL 1: Tata Letak Teks & Struktur Dokumen (Fundamental)",
      "scenarios": [
        {
          "title": "1. Surat Izin Internal Karyawan",
          "tujuan": "Penguasaan `Alignment` dan `Line Spacing` spesifik.",
          "skenario": "Mengetik surat sederhana.",
          "instruksi": "1. Buka file Word kosong dan ketik seluruh draf surat dari awal hingga akhir tanpa mempedulikan format.\n2. Blok nama perusahaan di kop surat, lalu pada tab Home klik 'Center' (Ctrl+E).\n3. Blok teks bagian Tanda Tangan di bawah, lalu klik 'Align Right' (Ctrl+R).\n4. Blok seluruh paragraf isi surat, lalu klik 'Justify' (Ctrl+J) agar rata kiri-kanan.\n5. Klik ikon 'Line and Paragraph Spacing' lalu pilih '1.5' agar surat mudah dibaca."
        },
        {
          "title": "2. Memo Internal Kademix (Presisi Tabulasi Ruler)",
          "tujuan": "Membangun *header* data vertikal tanpa menggunakan tombol `Space` berulang.",
          "skenario": "Merapikan tanda titik dua (:) pada kolom Kepada, Dari, Tanggal.",
          "instruksi": "1. Buka tab View, dan pastikan kotak 'Ruler' (Penggaris) sudah dicentang.\n2. Ketik kolom data vertikal secara berurutan (Kepada, Dari, Tanggal) ke bawah.\n3. Blok semua baris kata tersebut.\n4. Arahkan kursor ke penggaris (Ruler) bagian atas pada angka '3', lalu klik kiri satu kali hingga muncul tanda 'L' hitam kecil (Left Tab).\n5. Taruh kursor di akhir kata 'Kepada', tekan tombol 'Tab' di keyboard persis 1 kali, lalu ketik ': Budi'. Tanda titik dua akan otomatis melompat lurus sempurna."
        },
        {
          "title": "3. Desain Formulir Pendaftaran Fisik (Kapital & Underscore)",
          "tujuan": "`Change Case > UPPERCASE` dan garis bantu isi tangan.",
          "skenario": "Membuat formulir *hardcopy* cetak.",
          "instruksi": "1. Ketik baris formulir: 'Nama', 'NIK', dan 'Alamat' berurutan ke bawah.\n2. Letakkan kursor setelah kata 'Nama', tekan tombol 'Tab' 1 kali.\n3. Tahan tombol 'Shift' + tombol '-' (Underscore) di keyboard untuk memanjangkan garis bawah sebagai tempat isian peserta.\n4. Ulangi langkah 2 dan 3 untuk NIK dan Alamat.\n5. Blok seluruh teks yang Anda buat, klik tab Home > ikon 'Aa' (Change Case), lalu pilih 'UPPERCASE' untuk mengubah semuanya menjadi huruf kapital instan."
        },
        {
          "title": "4. Daftar Hadir Manual (Basic Table Matrix)",
          "tujuan": "Pembuatan `Table` dan `Shading` sorotan.",
          "skenario": "Mengabsen peserta Kademix tatap muka.",
          "instruksi": "1. Buka tab Insert > Table, geser mouse untuk membentuk kotak berukuran 5x10 (5 Kolom, 10 Baris).\n2. Di baris paling atas, isi sel dengan 'No', 'Nama', 'Jam', dan 'Paraf'.\n3. Blok kelima sel baris judul tersebut.\n4. Buka tab Home, klik tombol 'Bold' (Ctrl+B), dan klik 'Center' (Ctrl+E) agar posisi teks ada di tengah sel.\n5. Blok nama-nama peserta VIP/prioritas, lalu klik tab Home > 'Text Highlight Color' (ikon Stabilo) dan pilih warna biru muda agar nama tersebut tersorot mencolok."
        }
      ]
    },
    {
      "title": "LEVEL 2: Visualisasi Objek Bisnis & Kemitraan (Intermediate)",
      "scenarios": [
        {
          "title": "5. Pembuatan Master Kop Surat LPK Kademix",
          "tujuan": "Manajemen `Header`, `Pictures`, dan `Wrap Text > Square`.",
          "skenario": "Mendesain identitas korporat permanen di kertas.",
          "instruksi": "1. Arahkan mouse ke margin paling atas kertas, lalu klik kiri ganda (2x) dengan cepat untuk membuka kunci area Header.\n2. Ketik nama jalan dan alamat lengkap LPK Kademix, atur posisi 'Center'.\n3. Buka tab Insert > Pictures > This Device, lalu pilih file gambar logo Kademix.\n4. Klik logo yang baru masuk, akan muncul ikon tapal kuda (Layout Options) di sebelahnya. Klik ikon tersebut dan pilih 'Square'.\n5. Perkecil ukuran logo dengan menarik sudutnya, lalu seret bebas menggunakan mouse dan letakkan di sebelah kiri tulisan alamat.\n6. Buka tab Insert > Shapes > Line. Tarik garis panjang mendatar di bawah alamat untuk memisahkan kop dengan isi surat. Klik ganda area tengah kertas untuk menutup Header."
        },
        {
          "title": "6. Surat Penawaran Pengadaan Alat Hardware",
          "tujuan": "Integrasi Tabel Berwarna (`Table Design > Shading`).",
          "skenario": "Memasukkan katalog harga ke klien (Kodehack / LPK).",
          "instruksi": "1. Buka dokumen Word yang sudah memiliki Kop Surat.\n2. Buka tab Insert > Table, lalu buat tabel berukuran 4x4.\n3. Isi tabel dengan rincian barang dan harga katalog penawaran.\n4. Blok baris paling atas tabel (baris Header / Judul kolom).\n5. Buka tab Table Design di bagian atas pita layar, klik ikon 'Shading' (Ember cat), lalu pilih warna Biru Korporat gelap.\n6. Pindah ke tab Home, klik panah kecil di sebelah 'Font Color' (huruf A dengan warna merah di bawahnya), lalu pilih warna Putih agar teks terbaca jelas di atas latar biru gelap."
        },
        {
          "title": "7. Bagan Hierarki Organisasi (SmartArt)",
          "tujuan": "`Orientation > Landscape` dan `Insert > SmartArt`.",
          "skenario": "Pembuatan bagan SDM tanpa menggambar manual.",
          "instruksi": "1. Buka tab Layout > Orientation > pilih 'Landscape' agar kertas melebar dan bagan memiliki ruang yang luas.\n2. Buka tab Insert > SmartArt > pilih kategori 'Hierarchy' di sisi kiri.\n3. Pilih salah satu desain bagan struktur organisasi, lalu klik OK.\n4. Pada panel kotak teks kecil yang muncul, ketik 'Direktur' di posisi teratas.\n5. Untuk menambah divisi baru di bawahnya, klik kanan pada kotak Direktur > Add Shape > Add Shape Below.\n6. Untuk mempercantik, klik bagan Anda, lalu buka tab SmartArt Design > Change Colors untuk mengubah paduan warna bagan."
        },
        {
          "title": "8. Laporan Tren Pendaftar Bulanan (Analitik Grafik)",
          "tujuan": "Integrasi `Insert > Chart` dan Microsoft Excel.",
          "skenario": "Memasukkan data angka *visual* LPK.",
          "instruksi": "1. Buka tab Insert > Chart > pilih 'Column' (Grafik Batang) dan klik OK.\n2. Seketika jendela Microsoft Excel berukuran kecil akan terbuka berdampingan.\n3. Pada Excel tersebut, ganti tulisan 'Category 1' menjadi 'Bulan 1', lalu ganti tulisan 'Series 1' menjadi 'Coding for Kids'.\n4. Masukkan data angka jumlah siswa yang relevan pada sel Excel tersebut.\n5. Jika Anda mengetik dengan benar, batang grafik di dokumen Word Anda akan langsung bergerak naik-turun sesuai angka. Tutup layar Excel setelah selesai (klik silang merah)."
        }
      ]
    },
    {
      "title": "LEVEL 3: Arsitektur Publikasi & Manajemen Multi-Halaman (Advanced)",
      "scenarios": [
        {
          "title": "9. Brosur Promosi Kademix (3 Lipatan)",
          "tujuan": "`Layout > Margins > Narrow` dan `Columns`.",
          "skenario": "Desain brosur/flyer teks padat.",
          "instruksi": "1. Buka dokumen baru, buka tab Layout > Margins > pilih 'Narrow' (margin super tipis untuk efisiensi ruang).\n2. Ubah juga kertas menjadi melebar melalui Layout > Orientation > 'Landscape'.\n3. Ketikkan secara padat 3 paragraf panjang yang berisi rincian kursus LPK Kademix.\n4. Blok seluruh teks tersebut.\n5. Buka tab Layout > Columns > pilih 'Three'.\n6. Secara ajaib, seluruh teks yang tadinya melebar panjang akan terbagi rata menjadi 3 kolom sejajar secara vertikal, menciptakan format brosur siap lipat tiga."
        },
        {
          "title": "10. Format Artikel Editorial (Drop Cap & Wrap Text Tight)",
          "tujuan": "Menggunakan `Drop Cap` dan posisi dinamis gambar.",
          "skenario": "Membuat rilis artikel buletin LPK yang interaktif.",
          "instruksi": "1. Buka dokumen artikel panjang Anda, dan letakkan kursor berkedip tepat sebelum huruf pertama paragraf awal.\n2. Buka tab Insert > klik 'Drop Cap' di bagian kanan atas > pilih 'Dropped'. Huruf awalan seketika akan raksasa memakan area 3 baris teks.\n3. Buka tab Insert > Pictures, dan masukkan logo perusahaan Kademix ke bagian tengah paragraf.\n4. Klik logo tersebut, pilih ikon Layout Options (tapal kuda) > pilih opsi 'Tight'.\n5. Posisikan logo di tengah teks. Teks paragraf sekarang akan melengkung secara dinamis memeluk bentuk fisik logo, bukan sekadar bentuk kotak."
        },
        {
          "title": "11. SOP Standar Layanan Berbingkai Ganda",
          "tujuan": "`Page Borders` dan `Text Box` tanpa *Outline*.",
          "skenario": "Dokumen *Top-Level Management* dengan 2 kolom TTD.",
          "instruksi": "1. Buka tab Design > klik 'Page Borders' di sudut kanan atas layar.\n2. Pada jendela yang muncul, pilih opsi 'Box', tentukan gaya garis putus-putus atau klik dropdown 'Art' untuk memilih bingkai visual artisik.\n3. Gulir ke bagian paling dasar kertas dokumen.\n4. Buka tab Insert > Text Box > pilih opsi 'Draw Text Box' di paling bawah.\n5. Gambar (seret) dua buah kotak kosong bersebelahan untuk tanda tangan Direktur LPK dan Dinas Tenaga Kerja.\n6. Ketik nama jabatan di dalam masing-masing kotak. Terakhir, klik tepi kotak tersebut > buka tab Shape Format > Shape Outline > pilih 'No Outline' agar bingkai kotak tersebut musnah sempurna dan hanya menyisakan teks."
        },
        {
          "title": "12. Pemisahan DNA Format Kertas (Section Break - Keterampilan Mutlak)",
          "tujuan": "Menggunakan `Layout > Breaks > Next Page`.",
          "skenario": "1 File Word = Halaman 1 *Portrait*, Halaman 2 *Landscape*.",
          "instruksi": "1. Buka sebuah dokumen yang setidaknya memiliki 2 halaman teks penuh.\n2. Taruh kursor mouse berkedip tepat di akhir kata terakhir pada Halaman 1. (Perhatian: Ini sangat krusial).\n3. Buka tab Layout > buka panah ikon 'Breaks' > klik bagian Section Breaks > 'Next Page'.\n4. Kursor Anda kini telah dipaksa melompat ke awal Halaman 2.\n5. Berada di Halaman 2 tersebut, buka tab Layout > Orientation > klik 'Landscape'.\n6. Halaman 2 Anda sekarang berbentuk memanjang (Landscape) sementara Halaman 1 tetap dalam posisi berdiri tegak (Portrait) dalam satu file Word yang sama!"
        }
      ]
    },
    {
      "title": "LEVEL 4: Fitur Master Akademik & Otomatisasi (Senior Level)",
      "scenarios": [
        {
          "title": "13. Sistem Penomoran Ganda Buku/Modul",
          "tujuan": "`Link to Previous` dan `Format Page Numbers`.",
          "skenario": "Halaman Daftar Isi (Romawi: i, ii) dan Halaman Bab Materi (Angka: 1, 2).",
          "instruksi": "1. Buat dokumen dengan dua Section (seperti instruksi Latihan 12). Halaman 1 adalah Daftar Isi, Halaman 2 adalah Bab Materi.\n2. Klik ganda (2x) area bawah (Footer) pada Halaman 1.\n3. Buka tab Header & Footer > Page Number > Format Page Numbers. Ubah 'Number format' menjadi angka romawi 'i, ii, iii'.\n4. Gulir ke bawah dan klik di area Footer Halaman 2.\n5. Di tab atas Header & Footer, Anda akan melihat tombol 'Link to Previous' sedang menyala. **KLIK UNTUK MEMATIKANNYA**.\n6. Ubah format halaman untuk Halaman 2: Page Number > Format Page Numbers > pilih angka '1, 2, 3' dan ubah opsi bawah ke 'Start at: 1'. Kini dokumen Anda memiliki penomoran ganda yang terputus cerdas."
        },
        {
          "title": "14. Implementasi Hierarki Struktur (Styles)",
          "tujuan": "Menjadikan teks sebagai DNA sistem Daftar Isi.",
          "skenario": "Menandai judul utama dan sub-bab.",
          "instruksi": "1. Buka dokumen kosong.\n2. Ketikkan tulisan 'BAB 1 PENGENALAN'.\n3. Blok tulisan tersebut, lalu klik tab Home. Pada kotak panjang berisikan gaya tulisan (Style Gallery), klik kotak bertuliskan 'Heading 1'. Tulisan Anda kini diakui sebagai judul master dokumen.\n4. Tekan Enter untuk berpindah ke baris baru, lalu ketik '1.1 Pengenalan Perangkat Keras'.\n5. Blok tulisan tersebut, dan di kotak Style Gallery klik 'Heading 2'. Sistem Word kini mengenali bahwa ini adalah Sub-Bab resmi."
        },
        {
          "title": "15. Rendering Daftar Isi & Gambar Secara Instan",
          "tujuan": "Eksekusi `Table of Contents` dan `Insert Caption`.",
          "skenario": "Merangkum posisi ratusan halaman.",
          "instruksi": "1. Pastikan Anda telah mengaplikasikan 'Heading 1' dan 'Heading 2' secara disiplin pada seluruh judul materi Anda sesuai instruksi Latihan 14.\n2. Sediakan satu lembar kosong di urutan teratas dokumen (halaman 1).\n3. Taruh kursor di halaman kosong itu, klik tab References > klik 'Table of Contents' > pilih 'Automatic Table 1'. Daftar Isi yang merangkum posisi seluruh bab akan di-render otomatis dengan presisi titik mutlak.\n4. Sisipkan sebuah foto di tengah materi Anda (Insert > Pictures).\n5. Klik kanan pada foto tersebut > pilih 'Insert Caption'. Ketik 'Gambar Hardware' (hasilnya: Gambar 1. Gambar Hardware).\n6. Kembali ke lembar Daftar Isi, dan di bawahnya klik References > 'Insert Table of Figures' untuk menciptakan Daftar Gambar secara instan."
        },
        {
          "title": "16. Integrasi Bibliografi (Daftar Pustaka Internasional APA)",
          "tujuan": "`Manage Sources` dan `Bibliography`.",
          "skenario": "Dokumen Laporan Universitas/LPK.",
          "instruksi": "1. Buka dokumen makalah/laporan panjang Anda.\n2. Saat mengutip kalimat buku eksternal, klik tab References > klik ikon kecil 'Manage Sources' > klik tombol 'New'.\n3. Isi lengkap pop-up metadata buku tersebut (Nama Pengarang, Judul Buku, Tahun Terbit, Penerbit, Kota), lalu klik OK dan tutup (Close) pop-up pencatat sumber.\n4. Lompat ke halaman paling akhir pada makalah Anda, buat satu halaman kosong baru.\n5. Pastikan kolom Style di tab References berada pada pilihan 'APA' (American Psychological Association).\n6. Klik tombol 'Bibliography' > lalu pilih gaya pertama. Daftar Pustaka akan ter-render otomatis menyusun abjad pengarang sesuai format akademia global."
        }
      ]
    },
    {
      "title": "LEVEL 5: Otomatisasi Database & Keamanan Dokumen Tinggi (Expert Level)",
      "scenarios": [
        {
          "title": "17. Cetak Massal Sertifikat Lulus Kademix (Sistem Mail Merge)",
          "tujuan": "Mengawinkan MS Excel dengan fitur `Mailings` Word.",
          "skenario": "Mencetak ribuan sertifikat unik tanpa menyentuh *keyboard* manual.",
          "instruksi": "1. Di luar Word, buka Microsoft Excel. Buat Database NilaiSiswa.xlsx dengan dua judul kolom wajib: 'Nama_Siswa' dan 'Skor_Uji'. Isi dengan belasan nama. Simpan (Save) lalu tutup Excel-nya.\n2. Buka Microsoft Word dan buat atau buka kerangka desain Sertifikat Kosong Kelulusan.\n3. Buka tab Mailings > klik 'Select Recipients' > pilih 'Use an Existing List'. Temukan file Excel NilaiSiswa.xlsx yang Anda buat di komputer.\n4. Taruh kursor teks tepat di area kosong tempat nama peserta harusnya dicetak.\n5. Klik ikon 'Insert Merge Field' dan pilih 'Nama_Siswa' (tulisan yang muncul adalah «Nama_Siswa»).\n6. Untuk mengeksekusi cetak PDF, klik 'Finish & Merge' di ujung kanan pita Ribbon > pilih 'Edit Individual Documents' > OK. Word raksasa baru berisi ratusan sertifikat jadi akan tercipta."
        },
        {
          "title": "18. Slip Gaji Digital Dinamis (Tabel Invisible & Database)",
          "tujuan": "Merender tabel finansial dengan angka *database* dinamis.",
          "skenario": "HRD mengirim slip gaji presisi tanpa kesalahan *typo*.",
          "instruksi": "1. Buka kerangka dokumen struk gaji HRD perusahaan.\n2. Buka tab Insert > Table, ciptakan kotak tabel berjumlah 3 Kolom dan 5 Baris.\n3. Di Kolom Kiri: ketik Gaji Pokok, Tunjangan, dll. Di Kolom Tengah: ketik karakter titik dua (:) sejajar vertikal ke bawah. Di Kolom Kanan: masukkan variabel Merge Field Excel (misal «Gaji_Pokok») dan tambahkan Rp di depannya.\n4. Blok seluruh wujud tabel tersebut dari sudut ke sudut.\n5. Buka tab Home > klik ikon kotak bergaris putus (Borders) > pilih 'No Border'.\n6. Garis pembatas tabel hitam tersebut akan hilang sepenuhnya namun fondasi perataan struktur tabel tetap utuh, sehingga hasil cetak slip terlihat sangat rapi dan lurus mutlak."
        },
        {
          "title": "19. Tracking Revisi Perjanjian Kemitraan (Audit Kolaboratif)",
          "tujuan": "Mengawasi jejak rekam perubahan via `Track Changes`.",
          "skenario": "Manajer mengedit kontrak, namun direksi harus melihat bagian mana yang diubah.",
          "instruksi": "1. Manajer membuka Draf Perjanjian/MoU dari tim bawahan.\n2. Manajer mengeklik tab Review > lalu menekan tombol raksasa 'Track Changes' agar aktif (warna kelabu).\n3. Mulailah mengedit; hapus teks 'Biaya: 5 Juta'. Teks tersebut tidak akan lenyap, melainkan berwarna merah dengan coretan garis mendatar (Strikethrough) yang menandakan teks aslinya.\n4. Ketik koreksian baru 'Biaya: 6 Juta'. Teks ini akan tercatat dengan garis bawah (Underline) berwarna.\n5. Blok teks angka nominal baru tersebut, lalu klik tab Review > 'New Comment', tulis instruksi tegas di panel pinggir layar: 'Bawahan, angka direvisi mutlak sesuai arahan langsung Direktur hari ini.'\n6. Dokumen dikirim balik. Bawahan membuka dokumen, lalu mengklik tab Review > 'Accept' > 'Accept All Changes' untuk menyetujui seluruh revisi."
        },
        {
          "title": "20. Proteksi Formulir Super Ketat & Enkripsi HRD",
          "tujuan": "`Restrict Editing`, `Encrypt with Password`, `Create PDF`.",
          "skenario": "Mengirim Kontrak PKWT Karyawan (Hanya area Nama yang bisa diketik, *Layout* pasal dibekukan permanen).",
          "instruksi": "1. Buka file formulir biodata pendaftaran kosong milik LPK Kademix.\n2. Buka tab Review > klik ikon 'Restrict Editing' bergambar gembok kuning.\n3. Di panel kanan yang muncul, centang kotak nomor 2 (Editing restrictions), lalu klik menu dropdown di bawahnya dan pilih varian opsi 'Filling in forms'.\n4. Klik tombol di poin nomor 3 bertuliskan 'Yes, Start Enforcing Protection'.\n5. Kotak sandi rahasia akan muncul. Ketikkan kata sandi admin yang kuat dan jangan pernah lupa. (Kini staf lain yang membuka file ini sama sekali tidak bisa menghapus logo, format margin, dan tabel, melainkan keyboardnya hanya bereaksi saat berada dalam area formulir kosong).\n6. Simpan hasil tersebut menjadi absolut dengan klik File > Export > Create PDF/XPS Document. Format file pun mustahil diubah."
        }
      ]
    }
  ]
};
