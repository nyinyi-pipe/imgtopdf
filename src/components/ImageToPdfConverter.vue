<!-- <template>
    <div>
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <button @click="convertToPdf" :disabled="!imageLoaded">Convert to PDF</button>
    </div>
  </template>
  
  <script>
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  
  export default {
    data() {
      return {
        imageLoaded: false,
        imageFile: null
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.includes('image')) {
          this.imageLoaded = true;
          this.imageFile = file;
        }
      },
      convertToPdf() {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target.result;
          const img = new Image();
  
          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
  
            const pdf = new jsPDF({
              orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
              unit: 'mm',
              format: 'a4'
            });
  
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
  
            const scale = Math.max(imgWidth / pageWidth, imgHeight / pageHeight);
            const scaledWidth = imgWidth / scale;
            const scaledHeight = imgHeight / scale;
  
            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('2d');
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;
            canvasContext.drawImage(img, 0, 0, scaledWidth, scaledHeight);
  
            const addImageToPdf = (canvas) => {
              const imageDataUrl = canvas.toDataURL('image/jpeg');
              pdf.addImage(imageDataUrl, 'JPEG', 0, 0, pageWidth, pageHeight, null, 'FAST');
            };
  
            const mergePdfPages = async (pdfs) => {
              const mergedPdf = pdfs.reduce((accumulator, pdf) => {
                return accumulator.then(() => {
                  const renderContext = {
                    canvasContext: pdf.internal.canvas.getContext('2d'),
                    viewport: {
                      width: pageWidth,
                      height: pageHeight
                    }
                  };
  
                  return html2canvas(pdf.internal.canvas, renderContext).then((canvas) => {
                    addImageToPdf(canvas);
                  });
                });
              }, Promise.resolve());
  
              return mergedPdf;
            };
  
            const generatePdf = async () => {
              const pdfs = [];
              pdf.addPage();
  
              const pageCount = Math.ceil(scaledHeight / pageHeight);
  
              for (let i = 0; i < pageCount; i++) {
                const startY = i * pageHeight;
                const canvas = document.createElement('canvas');
                const canvasContext = canvas.getContext('2d');
                canvas.width = scaledWidth;
                canvas.height = Math.min(pageHeight, scaledHeight - startY);
                canvasContext.drawImage(canvas, 0, -startY, scaledWidth, Math.min(pageHeight, scaledHeight - startY));
  
                addImageToPdf(canvas);
              }
  
              return mergePdfPages(pdfs);
            };
  
            generatePdf().then(() => {
              pdf.save('converted.pdf');
            });
          };
  
          img.src = imgData;
        };
  
        reader.readAsDataURL(this.imageFile);
      }
    }
  };
  
  
  /* eslint-disable-next-line no-unused-vars */
  const html2canvasInstance = html2canvas;
  </script>
   -->



<!-- /*** Fix images to pdf page */ -->

   <template>
    <div>
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <button @click="convertToPdf" :disabled="!imageLoaded">Convert to PDF</button>
    </div>
  </template>
  
  <script>
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  
  export default {
    data() {
      return {
        imageLoaded: false,
        imageFile: null
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.includes('image')) {
          this.imageLoaded = true;
          this.imageFile = file;
        }
      },
      convertToPdf() {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgData = e.target.result;
          const img = new Image();
  
          img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
  
            const pdf = new jsPDF({
              orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
              unit: 'mm',
              format: 'a4'
            });
  
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
  
            const scale = Math.max(imgWidth / pageWidth, imgHeight / pageHeight);
            const scaledWidth = imgWidth / scale;
            const scaledHeight = imgHeight / scale;
  
            const addImageToPdf = (canvas) => {
              const imageDataUrl = canvas.toDataURL('image/jpeg');
              pdf.addImage(imageDataUrl, 'JPEG', 0, 0, pageWidth, pageHeight, null, 'FAST');
            };
  
            const mergePdfPages = async (pdfs) => {
              const mergedPdf = pdfs.reduce((accumulator, pdf) => {
                return accumulator.then(() => {
                  const renderContext = {
                    canvasContext: pdf.internal.canvas.getContext('2d'),
                    viewport: {
                      width: pageWidth,
                      height: pageHeight
                    }
                  };
  
                  return html2canvas(pdf.internal.canvas, renderContext).then((canvas) => {
                    addImageToPdf(canvas);
                  });
                });
              }, Promise.resolve());
  
              return mergedPdf;
            };
  
            const generatePdf = async () => {
              const pdfs = [];
              //pdf.addPage();
  
              const pageCount = Math.ceil(scaledHeight / pageHeight);
  
              for (let i = 0; i < pageCount; i++) {
                const startY = i * pageHeight;
                const canvas = document.createElement('canvas');
                const canvasContext = canvas.getContext('2d');
                canvas.width = scaledWidth;
                canvas.height = Math.min(pageHeight, scaledHeight - startY);
                canvasContext.drawImage(img, 0, -startY, scaledWidth, Math.min(pageHeight, scaledHeight - startY));
  
                addImageToPdf(canvas);
              }
  
              return mergePdfPages(pdfs);
            };
  
            generatePdf().then(() => {
              pdf.save('converted.pdf');
            });
          };
  
          img.src = imgData;
        };
  
        reader.readAsDataURL(this.imageFile);
      }
    }
  };
  </script>
   


  <!-- one image per pdf page ERROR  -->

<!-- 


<template>
    <div>
      <input type="file" @change="handleImageUpload" accept="image/*" multiple />
      <button @click="convertToPdf" :disabled="!imagesLoaded">Convert to PDF</button>
    </div>
  </template>
  
  <script>
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  
  export default {
    data() {
      return {
        imagesLoaded: false,
        imageFiles: []
      };
    },
    methods: {
      handleImageUpload(event) {
        const files = event.target.files;
        const imageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file && file.type.includes('image')) {
            imageFiles.push(file);
          }
        }
        this.imagesLoaded = imageFiles.length > 0;
        this.imageFiles = imageFiles;
      },
      convertToPdf() {
        const imageCount = this.imageFiles.length;
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
  
        const addImagesToPdf = async () => {
          const pagePromises = [];
          for (let i = 0; i < imageCount; i++) {
            const image = this.imageFiles[i];
  
            const canvas = document.createElement('canvas');
            canvas.width = pageWidth;
            canvas.height = pageHeight;
  
            const canvasContext = canvas.getContext('2d');
  
            const imgData = await getImageDataUrl(image);
            const img = await loadImage(imgData);
  
            const imageAspectRatio = img.width / img.height;
            const targetWidth = pageWidth;
            const targetHeight = targetWidth / imageAspectRatio;
  
            canvasContext.drawImage(img, 0, 0, targetWidth, targetHeight);
  
            const pagePromise = html2canvas(canvas).then((canvas) => {
              const imageDataUrl = canvas.toDataURL('image/jpeg');
              pdf.addImage(imageDataUrl, 'JPEG', 0, 0, pageWidth, pageHeight, null, 'FAST');
            });
            pagePromises.push(pagePromise);
          }
  
          return Promise.all(pagePromises);
        };
  
        const getImageDataUrl = (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve(e.target.result);
            };
            reader.readAsDataURL(file);
          });
        };
  
        const loadImage = (src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              resolve(img);
            };
            img.src = src;
          });
        };
  
        addImagesToPdf().then(() => {
          pdf.save('images.pdf');
        });
      }
    }
  };
  </script>
  
 -->
