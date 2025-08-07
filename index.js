
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
      const title = document.createElement("h2");
      title.innerText = "Generated Palette for " + baseColor;
      paletteOutput.appendChild(title);
      const baseBox = document.createElement("div");
      baseBox.className = "color-box";
      baseBox.style.backgroundColor = baseColor;
      baseBox.innerText = baseColor;
      paletteOutput.appendChild(baseBox);
      const baseHSL = document.createElement("p");
      baseHSL.innerText = `HSL: ${h}, ${s}%, ${l}%`;
      paletteOutput.appendChild(baseHSL);
      const baseHex = document.createElement("p");
      baseHex.innerText = `Hex: ${baseColor}`;
      paletteOutput.appendChild(baseHex);
      const baseRGB = document.createElement("p");
      baseRGB.innerText = `RGB: ${parseInt(baseColor.slice(1, 3), 16)}, ${parseInt(baseColor.slice(3, 5), 16)}, ${parseInt(baseColor.slice(5, 7), 16)}`;
      paletteOutput.appendChild(baseRGB);
      const baseCMYK = document.createElement("p");
      const r = parseInt(baseColor.slice(1, 3), 16);
      const g = parseInt(baseColor.slice(3, 5), 16);
      const b = parseInt(baseColor.slice(5, 7), 16);
      const c = 1 - r / 255;
      const m = 1 - g / 255;
      const y = 1 - b / 255;
      const k = Math.min(c, m, y);
      





      const combos = [
        [h, s, l],
        [(h + 30) % 360, s, l],
        [(h + 60) % 360, s, l],
        [(h + 180) % 360, s, l],
        [(h + 210) % 360, s, l],
        [(h + 330) % 360, s, l],
        [h, Math.min(s + 20, 100), Math.min(l + 20, 100)],
        [h, Math.max(s-20, 0), Math.max(l-20, 0)],
        [h, Math.min(s + 10, 100), Math.max(l - 10, 0)],
        [h, Math.max(s - 10, 0), Math.min(l + 10, 100)],
        [h, Math.min(s + 30, 100), Math.min(l + 30, 100)],
        [h, Math.max(s - 30, 0), Math.max(l - 30, 0)],
        
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

    
