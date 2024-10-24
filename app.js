function mainGame() {
  // Tangkap elemen tombol
  const buttonBatu = document.querySelector("#btn-batu");
  const buttonGunting = document.querySelector("#btn-gunting");
  const buttonKertas = document.querySelector("#btn-kertas");
  const buttonLagi = document.querySelector(".btn-lagi");

  // Fungsi menangani logika permainan
  function games(player) {
    // Pilihan komputer
    const computer = pilihanKomputer();

    // Fungsi untuk menentukan pilihan komputer
    function pilihanKomputer() {
      let angka = Math.floor(Math.random() * 9) + 1;
      if (angka >= 1 && angka <= 3) {
        return `batu`;
      } else if (angka >= 4 && angka <= 6) {
        return `gunting`;
      } else {
        return `kertas`;
      }
    }

    // Buat elemen baru untuk menunjukkan pilihan komputer
    function buatElementBaru() {
      const komputer = document.querySelector("#komputer");

      // Hapus elemen lama jika ada
      komputer.innerHTML = "";

      let headingKomputer = document.createElement("h1");
      headingKomputer.textContent = "Pilihan Komputer";

      let buttonKomputer = document.createElement("button");
      buttonKomputer.textContent = `${computer}`;

      komputer.appendChild(headingKomputer);
      komputer.appendChild(buttonKomputer);
    }

    // Tanda hasil pertandingan
    const menang = document.querySelector(".win");
    const kalah = document.querySelector(".lose");
    const seri = document.querySelector(".draw");

    // skor hasil pertandingan
    let skorSpan = document.querySelector("#skor");
    let skor = parseInt(skorSpan.textContent);

    // Rules permainan
    let hasil = "";
    buatElementBaru(); // Menampilkan pilihan komputer

    if (player === computer) {
      seri.classList.remove("hilang");
      hasil = `player: ${player}, komputer: ${computer}, hasil: DRAW!`;
    } else if (player === "batu") {
      if (computer === "gunting") {
        menang.classList.remove("hilang");
        skorSpan.textContent = skor + 1;
        hasil = `player: ${player}, komputer: ${computer}, hasil: WIN!`;
      } else {
        kalah.classList.remove("hilang");
        if (skor === 0) {
          hasil = `player: ${player}, komputer: ${computer}, hasil: LOSE!`;
        } else {
          skorSpan.textContent = skor - 1;
        }
      }
    } else if (player === "gunting") {
      if (computer === "batu") {
        kalah.classList.remove("hilang");
        if (skor === 0) {
          hasil = `player: ${player}, komputer: ${computer}, hasil: LOSE!`;
        } else {
          skorSpan.textContent = skor - 1;
        }
      } else {
        menang.classList.remove("hilang");
        skorSpan.textContent = skor + 1;
        hasil = `player: ${player}, komputer: ${computer}, hasil: WIN!`;
      }
    } else if (player === "kertas") {
      if (computer === "gunting") {
        kalah.classList.remove("hilang");
        if (skor === 0) {
          hasil = `player: ${player}, komputer: ${computer}, hasil: LOSE!`;
        } else {
          skorSpan.textContent = skor - 1;
        }
      } else {
        menang.classList.remove("hilang");
        skorSpan.textContent = skor + 1;
        hasil = `player: ${player}, komputer: ${computer}, hasil: WIN!`;
      }
    } else {
      hasil = `Memasukkan pilihan yang salah`;
    }

    console.log(hasil);
    buttonLagi.classList.remove("hilang");
  }

  // Menambahkan event listener hanya jika belum ada (mencegah duplikasi listener)
  if (!buttonBatu.disabled) {
    // Event listener untuk tombol batu
    buttonBatu.addEventListener("click", function () {
      games(this.textContent);
      buttonGunting.classList.add("hilang");
      buttonKertas.classList.add("hilang");
      this.disabled = true;
    });
  }

  if (!buttonGunting.disabled) {
    // Event listener untuk tombol gunting
    buttonGunting.addEventListener("click", function () {
      games(this.textContent);
      buttonBatu.classList.add("hilang");
      buttonKertas.classList.add("hilang");
      this.disabled = true;
    });
  }

  if (!buttonKertas.disabled) {
    // Event listener untuk tombol kertas
    buttonKertas.addEventListener("click", function () {
      games(this.textContent);
      buttonBatu.classList.add("hilang");
      buttonGunting.classList.add("hilang");
      this.disabled = true;
    });
  }
}

// menjalankan game ketika pertamakali halaman dikunjungi
mainGame();

// menjalankan game setelah user mengklik tombol lagi
document.querySelector(".btn-lagi").addEventListener("click", function () {
  console.log("Tombol 'lagi' diklik!");

  // membuat button baru
  document.querySelector("#komputer").innerHTML = "";

  const player = document.querySelector("#player");
  player.innerHTML = "<h1>pilihan kamu</h1>";

  const btnBatuBaru = document.createElement("button");
  btnBatuBaru.textContent = "batu";
  btnBatuBaru.setAttribute("type", "button");
  btnBatuBaru.setAttribute("id", "btn-batu");
  player.appendChild(btnBatuBaru);

  const btnGuntingBaru = document.createElement("button");
  btnGuntingBaru.textContent = "gunting";
  btnGuntingBaru.setAttribute("type", "button");
  btnGuntingBaru.setAttribute("id", "btn-gunting");
  player.appendChild(btnGuntingBaru);

  const btnKertasBaru = document.createElement("button");
  btnKertasBaru.textContent = "kertas";
  btnKertasBaru.setAttribute("type", "button");
  btnKertasBaru.setAttribute("id", "btn-kertas");
  player.appendChild(btnKertasBaru);

  // menghapus penanda
  const penanda = document.querySelector("#penanda");
  const tanda = penanda.querySelectorAll("h1");

  for (let tnd of tanda) {
    tnd.classList.add("hilang");
  }

  // menghapus tombol lagi
  this.classList.add("hilang");

  // menjalankan lagi
  mainGame();
});
