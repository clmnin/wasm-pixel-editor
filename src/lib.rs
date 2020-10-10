use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Clone, Copy)]
struct Rgb {
    r: u8,
    g: u8,
    b: u8,
}

#[wasm_bindgen]
pub struct Image {
    width: usize,
    height: usize,
    cells: Vec<Rgb>,
}

#[wasm_bindgen]
impl Image {
    #[wasm_bindgen(constructor)]
    pub fn new(width: usize, height: usize) -> Image {
        let mut cells = Vec::new();
        cells.resize(
            width * height,
            Rgb {
                r: 200,
                g: 200,
                b: 255,
            },
        );
        Image {
            width,
            height,
            cells,
        }
    }

    pub fn cells(&self) -> Vec<u8> {
        self.cells
            .iter()
            .map(|&rgb| vec![rgb.r, rgb.g, rgb.b])
            .collect::<Vec<Vec<u8>>>()
            .concat()
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn brush(&mut self, x: usize, y: usize, color: Vec<u8>) {
        let index = y * self.width + x;
        self.cells[index] = Rgb {
            r: color[0],
            g: color[1],
            b: color[2],
        };
    }
}
