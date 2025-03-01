class %CURRENT_CLASSNAME% extends lang.display.Sprite{

constructor(win){
this.win=win
this.assetsObj={}
init()
}

init(){
var th=this

th.reg('icons/logoVM2','<svg width="80px" height="50px" viewBox="0 0 80 50" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" opacity="1.00" d=" M 19.01 6.96 C 22.20 5.25 25.66 7.15 28.36 8.92 C 32.01 5.85 39.15 5.60 40.90 10.83 C 44.41 8.01 50.51 8.64 52.52 12.92 C 54.92 10.04 58.12 7.60 61.92 7.09 C 66.56 5.86 72.06 8.47 73.65 13.09 C 75.64 17.73 73.95 23.06 71.03 26.91 C 72.18 27.92 73.33 28.93 74.35 30.07 C 74.95 33.05 74.42 36.93 71.49 38.51 C 66.48 40.41 61.04 39.06 55.87 38.88 C 53.05 40.37 49.85 41.11 46.75 40.00 C 46.56 39.61 46.17 38.84 45.97 38.45 C 45.53 37.40 45.18 36.32 44.83 35.23 C 44.13 37.06 42.95 38.87 40.92 39.38 C 38.86 40.23 36.91 38.78 35.05 38.04 C 32.30 41.82 26.89 41.25 23.74 38.33 C 23.43 37.51 22.81 35.87 22.50 35.05 C 23.16 31.41 24.13 27.82 24.87 24.20 C 22.97 28.83 21.72 33.81 18.97 38.04 C 16.27 40.50 12.14 41.57 8.75 39.86 C 5.65 36.24 5.77 31.24 4.69 26.84 C 3.91 22.02 2.29 17.39 1.13 12.67 C 0.46 6.45 11.01 3.84 13.46 9.52 C 14.16 11.11 14.52 12.82 15.02 14.48 C 15.94 11.81 16.21 8.42 19.01 6.96 M 4.82 11.15 C 6.12 16.41 7.79 21.58 8.70 26.93 C 9.52 30.41 9.48 34.29 11.79 37.22 C 13.17 36.72 14.55 36.19 15.94 35.70 C 19.57 27.92 22.62 19.87 25.50 11.79 C 24.00 11.07 22.28 9.53 20.54 10.50 C 18.57 15.52 17.26 21.01 13.34 24.98 C 12.27 20.05 11.47 14.99 9.47 10.33 C 7.88 10.25 6.35 10.82 4.82 11.15 M 31.12 11.64 C 31.25 13.44 31.45 15.28 30.88 17.03 C 29.22 23.01 27.53 29.00 26.52 35.12 C 27.35 36.86 29.49 36.61 31.04 37.12 C 32.24 32.32 32.95 27.40 34.32 22.63 C 35.68 26.33 36.34 30.23 37.46 34.01 C 37.62 35.54 39.91 36.60 40.67 34.88 C 42.30 31.45 43.17 27.59 45.81 24.73 C 47.31 28.67 48.25 32.78 49.30 36.85 C 50.64 36.60 51.99 36.34 53.33 36.07 C 53.28 28.25 50.78 20.79 48.38 13.44 C 47.08 13.27 45.77 13.12 44.45 13.00 C 43.19 16.20 41.99 19.57 39.37 21.95 C 38.28 18.30 37.73 14.53 36.86 10.83 C 34.90 10.69 32.91 10.78 31.12 11.64 M 54.24 17.08 C 55.35 18.08 56.16 19.90 57.90 19.84 C 60.46 18.93 61.97 16.21 64.60 15.37 C 66.53 15.68 66.28 17.96 65.11 18.99 C 62.49 21.45 58.94 23.01 57.13 26.27 C 55.47 28.81 54.94 31.96 55.79 34.88 C 60.53 35.22 65.29 35.84 70.02 35.13 C 70.36 33.99 70.71 32.85 71.06 31.71 C 68.03 30.29 64.66 30.21 61.39 30.05 C 63.62 27.74 66.21 25.79 68.42 23.45 C 71.33 19.94 71.51 13.23 66.75 11.18 C 61.69 9.42 56.97 13.14 54.24 17.08 M 25.28 22.33 C 25.77 22.89 25.77 22.89 25.28 22.33 Z" /><path fill="#003b86" opacity="1.00" d=" M 4.82 11.15 C 6.35 10.82 7.88 10.25 9.47 10.33 C 11.47 14.99 12.27 20.05 13.34 24.98 C 17.26 21.01 18.57 15.52 20.54 10.50 C 22.28 9.53 24.00 11.07 25.50 11.79 C 22.62 19.87 19.57 27.92 15.94 35.70 C 14.55 36.19 13.17 36.72 11.79 37.22 C 9.48 34.29 9.52 30.41 8.70 26.93 C 7.79 21.58 6.12 16.41 4.82 11.15 M 8.07 14.29 C 6.47 17.24 11.40 14.50 8.07 14.29 M 21.43 14.44 C 20.35 15.41 19.66 17.29 20.29 18.67 C 21.92 18.81 22.94 15.03 21.43 14.44 M 9.20 17.55 C 8.20 18.17 8.37 20.59 9.78 20.39 C 10.78 19.77 10.61 17.35 9.20 17.55 M 13.36 27.26 C 12.63 26.49 11.90 25.73 11.15 24.98 C 10.93 24.17 10.50 22.54 10.28 21.73 C 10.44 25.88 11.63 29.87 12.26 33.95 C 12.69 34.07 13.54 34.32 13.96 34.44 C 15.61 29.33 18.77 24.85 20.07 19.61 C 18.11 22.38 16.09 25.18 13.36 27.26 Z" /><path fill="#003b86" opacity="1.00" d=" M 31.12 11.64 C 32.91 10.78 34.90 10.69 36.86 10.83 C 37.73 14.53 38.28 18.30 39.37 21.95 C 41.99 19.57 43.19 16.20 44.45 13.00 C 45.77 13.12 47.08 13.27 48.38 13.44 C 50.78 20.79 53.28 28.25 53.33 36.07 C 51.99 36.34 50.64 36.60 49.30 36.85 C 48.25 32.78 47.31 28.67 45.81 24.73 C 43.17 27.59 42.30 31.45 40.67 34.88 C 39.91 36.60 37.62 35.54 37.46 34.01 C 36.34 30.23 35.68 26.33 34.32 22.63 C 32.95 27.40 32.24 32.32 31.04 37.12 C 29.49 36.61 27.35 36.86 26.52 35.12 C 27.53 29.00 29.22 23.01 30.88 17.03 C 31.45 15.28 31.25 13.44 31.12 11.64 M 34.22 12.50 C 33.39 15.64 32.71 18.81 31.76 21.92 C 33.67 21.19 35.69 21.50 37.64 21.80 C 37.18 20.89 36.66 20.01 36.08 19.17 C 36.09 16.80 35.69 14.43 34.22 12.50 M 41.66 22.87 C 40.23 23.64 38.52 23.28 36.96 23.36 C 37.75 26.41 38.58 29.46 39.59 32.45 C 39.89 30.82 40.19 29.18 40.47 27.54 C 42.19 25.21 44.25 23.07 47.21 22.47 C 48.22 19.89 47.42 17.22 46.61 14.71 C 45.00 17.45 43.87 20.54 41.66 22.87 M 47.04 24.26 C 47.50 24.82 47.50 24.82 47.04 24.26 M 48.90 25.43 C 48.92 28.25 49.73 30.93 50.90 33.47 C 50.86 30.67 50.73 27.71 48.90 25.43 M 30.13 27.44 C 29.21 28.61 29.46 29.27 30.87 29.42 C 31.78 28.25 31.54 27.59 30.13 27.44 M 29.23 31.59 C 28.26 32.20 28.32 34.67 29.76 34.45 C 30.72 33.84 30.66 31.37 29.23 31.59 Z" /><path fill="#003b86" opacity="1.00" d=" M 54.24 17.08 C 56.97 13.14 61.69 9.42 66.75 11.18 C 71.51 13.23 71.33 19.94 68.42 23.45 C 66.21 25.79 63.62 27.74 61.39 30.05 C 64.66 30.21 68.03 30.29 71.06 31.71 C 70.71 32.85 70.36 33.99 70.02 35.13 C 65.29 35.84 60.53 35.22 55.79 34.88 C 54.94 31.96 55.47 28.81 57.13 26.27 C 58.94 23.01 62.49 21.45 65.11 18.99 C 66.28 17.96 66.53 15.68 64.60 15.37 C 61.97 16.21 60.46 18.93 57.90 19.84 C 56.16 19.90 55.35 18.08 54.24 17.08 M 56.66 17.99 C 59.32 16.50 61.83 14.76 64.18 12.82 C 60.97 13.16 57.86 14.86 56.66 17.99 M 59.93 25.98 C 58.24 27.94 57.89 30.61 57.16 33.02 C 60.19 33.05 63.22 32.89 66.23 32.58 C 64.08 32.31 61.92 32.09 59.77 31.87 C 59.33 26.45 65.53 24.68 67.66 20.40 C 64.86 21.90 62.03 23.54 59.93 25.98 Z" /><path fill="#0086ba" opacity="1.00" d=" M 34.22 12.50 C 35.69 14.43 36.09 16.80 36.08 19.17 C 36.66 20.01 37.18 20.89 37.64 21.80 C 35.69 21.50 33.67 21.19 31.76 21.92 C 32.71 18.81 33.39 15.64 34.22 12.50 Z" /><path fill="#006ea6" opacity="1.00" d=" M 56.66 17.99 C 57.86 14.86 60.97 13.16 64.18 12.82 C 61.83 14.76 59.32 16.50 56.66 17.99 Z" /><path fill="#0078ad" opacity="1.00" d=" M 8.07 14.29 C 11.40 14.50 6.47 17.24 8.07 14.29 Z" /><path fill="#006ba4" opacity="1.00" d=" M 21.43 14.44 C 22.94 15.03 21.92 18.81 20.29 18.67 C 19.66 17.29 20.35 15.41 21.43 14.44 Z" /><path fill="#0086ba" opacity="1.00" d=" M 41.66 22.87 C 43.87 20.54 45.00 17.45 46.61 14.71 C 47.42 17.22 48.22 19.89 47.21 22.47 C 44.25 23.07 42.19 25.21 40.47 27.54 C 40.19 29.18 39.89 30.82 39.59 32.45 C 38.58 29.46 37.75 26.41 36.96 23.36 C 38.52 23.28 40.23 23.64 41.66 22.87 Z" /><path fill="#006ba4" opacity="1.00" d=" M 9.20 17.55 C 10.61 17.35 10.78 19.77 9.78 20.39 C 8.37 20.59 8.20 18.17 9.20 17.55 Z" /><path fill="#0086ba" opacity="1.00" d=" M 13.36 27.26 C 16.09 25.18 18.11 22.38 20.07 19.61 C 18.77 24.85 15.61 29.33 13.96 34.44 C 13.54 34.32 12.69 34.07 12.26 33.95 C 11.63 29.87 10.44 25.88 10.28 21.73 C 10.50 22.54 10.93 24.17 11.15 24.98 C 11.90 25.73 12.63 26.49 13.36 27.26 Z" /><path fill="#007aaf" opacity="1.00" d=" M 59.93 25.98 C 62.03 23.54 64.86 21.90 67.66 20.40 C 65.53 24.68 59.33 26.45 59.77 31.87 C 61.92 32.09 64.08 32.31 66.23 32.58 C 63.22 32.89 60.19 33.05 57.16 33.02 C 57.89 30.61 58.24 27.94 59.93 25.98 Z" /><path fill="#a2a2a2" opacity="0.84" d=" M 25.28 22.33 C 25.77 22.89 25.77 22.89 25.28 22.33 Z" /><path fill="#000b42" opacity="1.00" d=" M 47.04 24.26 C 47.50 24.82 47.50 24.82 47.04 24.26 Z" /><path fill="#000000" opacity="0.55" d=" M 24.87 24.20 C 24.13 27.82 23.16 31.41 22.50 35.05 C 21.60 37.92 20.02 41.04 16.89 41.95 C 14.09 43.43 10.17 43.00 8.75 39.86 C 12.14 41.57 16.27 40.50 18.97 38.04 C 21.72 33.81 22.97 28.83 24.87 24.20 Z" /><path fill="#0072a9" opacity="1.00" d=" M 48.90 25.43 C 50.73 27.71 50.86 30.67 50.90 33.47 C 49.73 30.93 48.92 28.25 48.90 25.43 Z" /><path fill="#006ea5" opacity="1.00" d=" M 30.13 27.44 C 31.54 27.59 31.78 28.25 30.87 29.42 C 29.46 29.27 29.21 28.61 30.13 27.44 Z" /><path fill="#000000" opacity="0.55" d=" M 74.35 30.07 C 75.97 33.29 76.21 37.71 73.11 40.15 C 67.19 43.41 60.23 39.46 54.13 41.95 C 51.53 43.12 48.14 42.78 46.75 40.00 C 49.85 41.11 53.05 40.37 55.87 38.88 C 61.04 39.06 66.48 40.41 71.49 38.51 C 74.42 36.93 74.95 33.05 74.35 30.07 Z" /><path fill="#0070a7" opacity="1.00" d=" M 29.23 31.59 C 30.66 31.37 30.72 33.84 29.76 34.45 C 28.32 34.67 28.26 32.20 29.23 31.59 Z" /><path fill="#000000" opacity="0.55" d=" M 44.83 35.23 C 45.18 36.32 45.53 37.40 45.97 38.45 C 44.37 39.62 42.97 41.42 40.88 41.63 C 39.20 41.55 37.66 40.79 36.07 40.31 C 32.57 44.20 25.82 43.19 23.74 38.33 C 26.89 41.25 32.30 41.82 35.05 38.04 C 36.91 38.78 38.86 40.23 40.92 39.38 C 42.95 38.87 44.13 37.06 44.83 35.23 Z" /></svg>',{width:160,height:100})

th.reg('icons/zoomPlus','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z" fill="#FFFFFF"/></svg>',{width:30,height:30})

th.reg('icons/zoomMinus','<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 14 2"><rect x="0" y="0" width="14" height="2"/></svg>',{width:14,height:2})

th.reg('icons/minimize','<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 14 10"><rect x="0" y="0" width="14" height="2"/></svg>',{width:14,height:10})

th.reg('icons/maximize','<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 42 42"><path d="M0.5,4.5v33h40v-33H0.5z M3.5,7.5h34v27h-34V7.5z"/></svg>',{width:20,height:24})

th.reg('icons/close','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6.21991 6.21479C6.51281 5.92189 6.98768 5.92189 7.28057 6.21479L17.7854 16.7196C18.0783 17.0125 18.0783 17.4874 17.7854 17.7803C17.4925 18.0732 17.0177 18.0732 16.7248 17.7803L6.21991 7.27545C5.92702 6.98255 5.92702 6.50768 6.21991 6.21479Z" fill="#FFFFFF"/><path d="M17.7853 6.21479C18.0782 6.50769 18.0782 6.98256 17.7853 7.27545L7.28038 17.7802C6.98749 18.0731 6.51261 18.0731 6.21972 17.7802C5.92683 17.4873 5.92683 17.0124 6.21973 16.7195L16.7247 6.21478C17.0176 5.92189 17.4924 5.9219 17.7853 6.21479Z" fill="#FFFFFF"/></g></svg>',{width:32,height:32})

th.reg('icons/fs','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2C2.89543 2 2 2.89543 2 4V8C2 8.55228 2.44772 9 3 9C3.55228 9 4 8.55228 4 8V4H8C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2H4Z" fill="#FFFFFF"/><path d="M20 2C21.1046 2 22 2.89543 22 4V8C22 8.55228 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V4H16C15.4477 4 15 3.55228 15 3C15 2.44772 15.4477 2 16 2H20Z" fill="#FFFFFF"/><path d="M20 22C21.1046 22 22 21.1046 22 20V16C22 15.4477 21.5523 15 21 15C20.4477 15 20 15.4477 20 16V20H16C15.4477 20 15 20.4477 15 21C15 21.5523 15.4477 22 16 22H20Z" fill="#FFFFFF"/><path d="M2 20C2 21.1046 2.89543 22 4 22H8C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20H4V16C4 15.4477 3.55228 15 3 15C2.44772 15 2 15.4477 2 16V20Z" fill="#FFFFFF"/></svg>',{width:24,height:24})

th.reg('icons/sun1','<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#FFFFFF" stroke="none"><path d="M301 604 c-31 -33 -37 -36 -75 -31 -22 3 -51 9 -63 13 -21 6 -23 3 -23 -33 0 -50 -29 -89 -73 -98 -48 -11 -49 -13 -27 -55 26 -52 25 -78 -6 -123 -14 -21 -24 -40 -22 -41 1 -1 18 -8 36 -16 45 -18 62 -46 62 -101 l0 -47 59 5 c53 5 62 3 83 -19 14 -13 30 -32 36 -43 10 -19 13 -18 48 19 34 35 41 38 78 33 23 -3 51 -9 64 -13 20 -6 22 -3 22 33 0 52 27 86 79 102 l41 12 -20 39 c-26 52 -25 78 6 123 14 21 24 40 22 41 -1 1 -17 8 -35 15 -45 18 -57 36 -63 95 l-5 51 -52 -3 c-60 -4 -85 7 -110 48 -9 17 -20 30 -23 30 -3 0 -20 -17 -39 -36z m86 -69 c109 -32 179 -150 154 -260 -40 -178 -252 -242 -380 -114 -27 27 -46 58 -56 92 -19 63 -19 71 1 136 19 66 78 125 143 145 60 19 77 19 138 1z"/><path d="M256 516 c-56 -21 -87 -47 -113 -92 -59 -104 -25 -227 77 -284 124 -68 281 9 305 150 25 145 -132 276 -269 226z"/></g></svg>',{width:22,height:22})

th.reg('icons/moon1','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.02911 12.42C2.38911 17.57 6.75911 21.76 11.9891 21.99C15.6791 22.15 18.9791 20.43 20.9591 17.72C21.7791 16.61 21.3391 15.87 19.9691 16.12C19.2991 16.24 18.6091 16.29 17.8891 16.26C12.9991 16.06 8.99911 11.97 8.97911 7.13996C8.96911 5.83996 9.23911 4.60996 9.72911 3.48996C10.2691 2.24996 9.61911 1.65996 8.36911 2.18996C4.40911 3.85996 1.69911 7.84996 2.02911 12.42Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',{width:22,height:22})

th.reg('icons/photo1','<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9C3 7.89543 3.89543 7 5 7H6.5C7.12951 7 7.72229 6.70361 8.1 6.2L9.15 4.8C9.52771 4.29639 10.1205 4 10.75 4H13.25C13.8795 4 14.4723 4.29639 14.85 4.8L15.9 6.2C16.2777 6.70361 16.8705 7 17.5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="13" r="4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',{width:24,height:24})

th.reg('icons/settings1','<svg width="800px" height="800px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Settings"><rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"></rect><circle stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" cx="12" cy="12" r="3"></circle><path d="M10.069,3.36281 C10.7151,1.54573 13.2849,1.54573 13.931,3.3628 C14.338,4.5071 15.6451,5.04852 16.742,4.52713 C18.4837,3.69918 20.3008,5.51625 19.4729,7.25803 C18.9515,8.35491 19.4929,9.66203 20.6372,10.069 C22.4543,10.7151 22.4543,13.2849 20.6372,13.931 C19.4929,14.338 18.9515,15.6451 19.4729,16.742 C20.3008,18.4837 18.4837,20.3008 16.742,19.4729 C15.6451,18.9515 14.338,19.4929 13.931,20.6372 C13.2849,22.4543 10.7151,22.4543 10.069,20.6372 C9.66203,19.4929 8.35491,18.9515 7.25803,19.4729 C5.51625,20.3008 3.69918,18.4837 4.52713,16.742 C5.04852,15.6451 4.5071,14.338 3.3628,13.931 C1.54573,13.2849 1.54573,10.7151 3.36281,10.069 C4.5071,9.66203 5.04852,8.35491 4.52713,7.25803 C3.69918,5.51625 5.51625,3.69918 7.25803,4.52713 C8.35491,5.04852 9.66203,4.5071 10.069,3.36281 Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"></path></g></g></svg>',{width:22,height:22})

}

getBitmap(path){
var th=this
var bm=null
if(path && path in th.assetsObj){
var ob=th.assetsObj[path]
//var koefV=th.win.panelH/th.win.panelHStart
var scaleSize={width:0,height:0}
var resolution=1
if(th.win)resolution=th.win.getMainScale()
if('width' in ob)scaleSize.width=ob.width*resolution
if('height' in ob)scaleSize.height=ob.height*resolution
bm=new lang.display.Bitmap
bm.resolution=resolution
bm.scaleSize=scaleSize
bm.src=ob.data
}
return bm
}

reg(path,data,obj){
var th=this
if(path && data){
var ob={data:data}
if(obj){
if('width' in obj && obj.width>0)ob.width=obj.width
if('height' in obj && obj.height>0)ob.height=obj.height
}
th.assetsObj[path]=ob
}
}

}