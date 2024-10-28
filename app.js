const containerTombolTop = document.querySelector(".container-tombol-top");
const containerTombolBot = document.querySelector(".container-tombol-bot");
const pilPlayer = document.querySelector(".pilihan-player");

// game suit batu, gunting, kertas
function mainGame() {
  // Tangkap elemen tombol
  const buttonKertas = document.querySelector("#btn-kertas");
  const buttonGunting = document.querySelector("#btn-gunting");
  const buttonBatu = document.querySelector("#btn-batu");

  // tankap container
  const gameStepSatu = document.querySelector(".game-step-satu");
  const gameStepDua = document.querySelector(".game-step-dua");
  const penanda = document.querySelector(".penanda");
  const pilKomputer = document.querySelector(".pilihan-komputer");
  const pilPlayer = document.querySelector(".pilihan-player");

  // pilihan komputer
  let komp;

  function games(player) {
    // Pilihan komputer
    const komputer = pilihanKomputer();
    komp = komputer;

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

    // span untuk di dalam kontainer pilihan komputer
    function buatElementBaru() {
      const spanBaru = document.createElement("span");
      spanBaru.classList.add(`pilih-${komputer}`);
      pilKomputer.appendChild(spanBaru);
    }

    // penanda menang, seri, kalah
    function tanda(status) {
      if (status === "seri") {
        setTimeout(() => {
          penanda.querySelector("h4").textContent = `${status}`;
          penanda.style.visibility = "visible";
        }, 1000);
      } else if (status === "menang") {
        setTimeout(() => {
          penanda.querySelector("h4").textContent = `kamu ${status}`;
          penanda.style.visibility = "visible";
        }, 1000);
      } else if (status === "kalah") {
        setTimeout(() => {
          penanda.querySelector("h4").textContent = `kamu ${status}`;
          penanda.style.visibility = "visible";
        }, 1000);
      } else {
        console.log("status tidak diketahui");
      }
    }

    // pengaturan skor
    let skorSpan = document.querySelector(".angka-skor");
    let skor = parseInt(skorSpan.textContent);

    // membuat elemen baru
    buatElementBaru();

    // aturan main
    if (player === komputer) {
      tanda("seri");
    } else if (player === "batu") {
      if (komputer === "gunting") {
        tanda("menang");
        setTimeout(() => {
          skorSpan.textContent = skor + 1;
        }, 1500);
      } else {
        tanda("kalah");
        if (skor !== 0) {
          setTimeout(() => {
            skorSpan.textContent = skor - 1;
          }, 1500);
        }
      }
    } else if (player === "gunting") {
      if (komputer === "batu") {
        tanda("kalah");
        if (skor !== 0) {
          setTimeout(() => {
            skorSpan.textContent = skor - 1;
          }, 1500);
        }
      } else {
        tanda("menang");
        setTimeout(() => {
          skorSpan.textContent = skor + 1;
        }, 1500);
      }
    } else if (player === "kertas") {
      if (komputer === "gunting") {
        tanda("kalah");
        if (skor !== 0) {
          setTimeout(() => {
            skorSpan.textContent = skor - 1;
          }, 1500);
        }
      } else {
        tanda("menang");
        setTimeout(() => {
          skorSpan.textContent = skor + 1;
        }, 1500);
      }
    } else {
      console.log("hasil tidak diketahui");
    }
  }

  // Fungsi ini dijalankan ketika player memilih
  function klikTombol(tombol) {
    games(tombol);
    gameStepSatu.classList.add("hilang");
    gameStepDua.classList.remove("hilang");
    penanda.style.visibility = "hidden";

    let spanKomp = pilKomputer.querySelector(`.pilih-${komp}`);
    spanKomp.style.visibility = "hidden";
    setTimeout(() => {
      spanKomp.style.visibility = "visible";
    }, 500);
  }

  // Event listener untuk tombol batu
  buttonBatu.addEventListener("click", function () {
    klikTombol(this.getAttribute("aria-label"));
    pilPlayer.querySelector(".pilih-batu").classList.remove("hilang");
  });

  // Event listener untuk tombol gunting
  buttonGunting.addEventListener("click", function () {
    klikTombol(this.getAttribute("aria-label"));
    pilPlayer.querySelector(".pilih-gunting").classList.remove("hilang");
  });

  // Event listener untuk tombol kertas
  buttonKertas.addEventListener("click", function () {
    klikTombol(this.getAttribute("aria-label"));
    pilPlayer.querySelector(".pilih-kertas").classList.remove("hilang");
  });
}

// menjalankan game pertama kali
mainGame();

// fungsi menghilangkan kontainer
function removeContainer() {
  document.querySelector(".game-step-dua").classList.add("hilang");
  document.querySelector(".game-step-satu").classList.remove("hilang");
  document.querySelector(".container-tombol-top").innerHTML = "";
  document.querySelector(".container-tombol-bot").innerHTML = "";
  document.querySelector(".pilihan-komputer").innerHTML = "<h6>pilihan kamu</h6>";
}

// elemen baru untuk rounde berikutnya
function kertasBaru() {
  const btnKertasBaru = document.createElement("span");
  btnKertasBaru.setAttribute("aria-label", "kertas");
  btnKertasBaru.setAttribute("id", "btn-kertas");
  btnKertasBaru.classList.add("kotak", "kertas");
  containerTombolTop.appendChild(btnKertasBaru);

  pilPlayer.querySelector(".pilih-kertas").classList.add("hilang");
}

function guntingBaru() {
  const btnGuntingBaru = document.createElement("span");
  btnGuntingBaru.setAttribute("aria-label", "gunting");
  btnGuntingBaru.setAttribute("id", "btn-gunting");
  btnGuntingBaru.classList.add("kotak", "gunting");
  containerTombolTop.appendChild(btnGuntingBaru);

  pilPlayer.querySelector(".pilih-gunting").classList.add("hilang");
}

function batuBaru() {
  const btnBatuBaru = document.createElement("span");
  btnBatuBaru.setAttribute("aria-label", "batu");
  btnBatuBaru.setAttribute("id", "btn-batu");
  btnBatuBaru.classList.add("kotak", "batu");
  containerTombolBot.appendChild(btnBatuBaru);

  pilPlayer.querySelector(".pilih-batu").classList.add("hilang");
}

document.querySelector(".main-lagi").addEventListener("click", function () {
  removeContainer();
  kertasBaru();
  guntingBaru();
  batuBaru();

  // menjalankan lagi
  mainGame();
});
