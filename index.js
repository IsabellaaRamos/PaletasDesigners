
    function hexToHSL(H) {
      let r = 0, g = 0, b = 0;
      if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
      } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
      }
      r /= 255;
      g /= 255;
      b /= 255;
      let cmin = Math.min(r, g, b),
          cmax = Math.max(r, g, b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;

      if (delta == 0) h = 0;
      else if (cmax == r) h = ((g - b) / delta) % 6;
      else if (cmax == g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;

      h = Math.round(h * 60);
      if (h < 0) h += 360;
      l = (cmax + cmin) / 2;
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      return [h, s, l];
    }

    function hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs((h / 60) % 2 - 1)),
          m = l - c / 2,
          r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

      r = Math.round((r + m) * 255).toString(16).padStart(2, "0");
      g = Math.round((g + m) * 255).toString(16).padStart(2, "0");
      b = Math.round((b + m) * 255).toString(16).padStart(2, "0");

      return "#" + r + g + b;
    }

    function generatePalette() {
      const colorInput = document.getElementById("colorPicker").value;
      const colorText = document.getElementById("colorHex").value;
      const baseColor = colorText || colorInput;
      document.getElementById("colorHex").value = baseColor;

      const [h, s, l] = hexToHSL(baseColor);
      const paletteOutput = document.getElementById("paletteOutput");
      paletteOutput.innerHTML = "";

      const combos = [
        [h, s, l],
        [(h + 30) % 360, s, l],
        [(h + 60) % 360, s, l],
        [(h + 180) % 360, s, l],
        [(h + 210) % 360, s, l],
        [(h + 330) % 360, s, l],
      ];

      combos.forEach(([ch, cs, cl]) => {
        const hex = hslToHex(ch, cs, cl);
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = hex;
        box.innerText = hex;
        paletteOutput.appendChild(box);
      });
    }
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("generatePalette").addEventListener("click", generatePalette);
      document.getElementById("colorPicker").addEventListener("input", (e) => {
        document.getElementById("colorHex").value = e.target.value;
      });
    });

    
