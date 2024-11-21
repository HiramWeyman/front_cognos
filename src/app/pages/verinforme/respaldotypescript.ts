generarPDF() {
    // Mostrar el mensaje de "Descargando reporte"
    const loadingMessage = document.getElementById('loading');
    loadingMessage.style.display = 'block';
    var nombre:string=this.informe.inf_paterno+'_'+this.informe.inf_materno+'_'+this.informe.inf_nombre+'.pdf';
   const pdf = new jsPDF('p', 'pt', 'a4');
   
   // Capturar la primera sección
   const section1 = document.getElementById('seccion1');
   html2canvas(section1, { scale: 0.8 }).then((canvas1) => {
     const imgData1 = canvas1.toDataURL('image/png');
     const imgWidth = pdf.internal.pageSize.getWidth() - 40; // Margen de 20px a cada lado
     const imgHeight1 = (canvas1.height * imgWidth) / canvas1.width;
     
     pdf.addImage(imgData1, 'PNG', 20, 20, imgWidth, imgHeight1);
 
     // Capturar la segunda sección
     const section2 = document.getElementById('seccion2');
     html2canvas(section2, { scale: 0.8 }).then((canvas2) => {
       const imgData2 = canvas2.toDataURL('image/png');
       const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;
       
       pdf.addPage();
       pdf.addImage(imgData2, 'PNG', 20, 20, imgWidth, imgHeight2);
 
       // Capturar la tercera sección
       const section3 = document.getElementById('seccion3');
       html2canvas(section3, { scale: 0.8 }).then((canvas3) => {
         const imgData3 = canvas3.toDataURL('image/png');
         const imgHeight3 = (canvas3.height * imgWidth) / canvas3.width;
 
         pdf.addPage();
         pdf.addImage(imgData3, 'PNG', 20, 20, imgWidth, imgHeight3);
 
         // Capturar la cuarta sección
         const section4 = document.getElementById('seccion4');
         html2canvas(section4, { scale:0.8 }).then((canvas4) => {
           const imgData4 = canvas4.toDataURL('image/png');
           const imgHeight4 = (canvas4.height * imgWidth) / canvas4.width;
 
           pdf.addPage();
           pdf.addImage(imgData4, 'PNG', 20, 20, imgWidth, imgHeight4);
 
           // Capturar la quinta sección
           const section5 = document.getElementById('seccion5');
           html2canvas(section5, { scale: 0.8 }).then((canvas5) => {
             const imgData5 = canvas5.toDataURL('image/png');
             const imgHeight5 = (canvas5.height * imgWidth) / canvas5.width;
 
             pdf.addPage();
             pdf.addImage(imgData5, 'PNG', 20, 20, imgWidth, imgHeight5);
 
             // Capturar la sexta sección
             const section6 = document.getElementById('seccion6');
             html2canvas(section6, { scale: 0.8 }).then((canvas6) => {
               const imgData6 = canvas6.toDataURL('image/png');
               const imgHeight6 = (canvas6.height * imgWidth) / canvas6.width;
 
               pdf.addPage();
               pdf.addImage(imgData6, 'PNG', 20, 20, imgWidth, imgHeight6);
 
               // Capturar la séptima sección
               const section7 = document.getElementById('seccion7');
               html2canvas(section7, { scale: 0.8 }).then((canvas7) => {
                 const imgData7 = canvas7.toDataURL('image/png');
                 const imgHeight7 = (canvas7.height * imgWidth) / canvas7.width;
 
                 pdf.addPage();
                 pdf.addImage(imgData7, 'PNG', 20, 20, imgWidth, imgHeight7);
 
                 // Capturar la octava sección
                 const section8 = document.getElementById('seccion8');
                 html2canvas(section8, { scale: 0.8 }).then((canvas8) => {
                   const imgData8 = canvas8.toDataURL('image/png');
                   const imgHeight8 = (canvas8.height * imgWidth) / canvas8.width;
 
                   pdf.addPage();
                   pdf.addImage(imgData8, 'PNG', 20, 20, imgWidth, imgHeight8);
 
                   // Capturar la novena sección
                   const section9 = document.getElementById('seccion9');
                   html2canvas(section9, { scale: 0.8 }).then((canvas9) => {
                     const imgData9 = canvas9.toDataURL('image/png');
                     const imgHeight9 = (canvas9.height * imgWidth) / canvas9.width;
 
                     pdf.addPage();
                     pdf.addImage(imgData9, 'PNG', 20, 20, imgWidth, imgHeight9);
 
                     // Capturar la décima sección
                     const section10 = document.getElementById('seccion10');
                     html2canvas(section10, { scale: 0.8 }).then((canvas10) => {
                       const imgData10 = canvas10.toDataURL('image/png');
                       const imgHeight10 = (canvas10.height * imgWidth) / canvas10.width;
 
                       pdf.addPage();
                       pdf.addImage(imgData10, 'PNG', 20, 20, imgWidth, imgHeight10);
 
                       // Capturar la undécima sección
                       const section11 = document.getElementById('seccion11');
                       html2canvas(section11, { scale: 0.8 }).then((canvas11) => {
                         const imgData11 = canvas11.toDataURL('image/png');
                         const imgHeight11 = (canvas11.height * imgWidth) / canvas11.width;
 
                         pdf.addPage();
                         pdf.addImage(imgData11, 'PNG', 20, 20, imgWidth, imgHeight11);
 
                         // Capturar la duodécima sección
                         const section12 = document.getElementById('seccion12');
                         html2canvas(section12, { scale: 0.8 }).then((canvas12) => {
                           const imgData12 = canvas12.toDataURL('image/png');
                           const imgHeight12 = (canvas12.height * imgWidth) / canvas12.width;
 
                           pdf.addPage();
                           pdf.addImage(imgData12, 'PNG', 20, 20, imgWidth, imgHeight12);
 
                           // Capturar la decimotercera sección
 
 
                           
                           const section13 = document.getElementById('seccion13');
                           html2canvas(section13, { scale: 0.8 }).then((canvas13) => {
                             const imgData13 = canvas13.toDataURL('image/png');
                             const imgHeight13 = (canvas13.height * imgWidth) / canvas13.width;
 
                             pdf.addPage();
                             pdf.addImage(imgData13, 'PNG', 20, 20, imgWidth, imgHeight13);
 
                             // Capturar la decimocuarta sección
                             const section14 = document.getElementById('seccion14');
                             html2canvas(section14, { scale: 0.8 }).then((canvas14) => {
                               const imgData14 = canvas14.toDataURL('image/png');
                               const imgHeight14 = (canvas14.height * imgWidth) / canvas14.width;
 
                               pdf.addPage();
                               pdf.addImage(imgData14, 'PNG', 20, 20, imgWidth, imgHeight14);
 
                               // Capturar la decimoquinta sección
                               const section15 = document.getElementById('seccion15');
                               html2canvas(section15, { scale: 0.8 }).then((canvas15) => {
                                 const imgData15 = canvas15.toDataURL('image/png');
                                 const imgHeight15 = (canvas15.height * imgWidth) / canvas15.width;
 
                                 pdf.addPage();
                                 pdf.addImage(imgData15, 'PNG', 20, 20, imgWidth, imgHeight15);
 
                                 // Capturar la decimosexta sección
                                 const section16 = document.getElementById('seccion16');
                                 html2canvas(section16, { scale: 0.8 }).then((canvas16) => {
                                   const imgData16 = canvas16.toDataURL('image/png');
                                   const imgHeight16 = (canvas16.height * imgWidth) / canvas16.width;
 
                                   pdf.addPage();
                                   pdf.addImage(imgData16, 'PNG', 20, 20, imgWidth, imgHeight16);
 
                                   // Capturar la decimoséptima sección
                                   const section17 = document.getElementById('seccion17');
                                   html2canvas(section17, { scale: 0.8 }).then((canvas17) => {
                                     const imgData17 = canvas17.toDataURL('image/png');
                                     const imgHeight17 = (canvas17.height * imgWidth) / canvas17.width;
 
                                     pdf.addPage();
                                     pdf.addImage(imgData17, 'PNG', 20, 20, imgWidth, imgHeight17);
 
                                     // Capturar la decimoctava sección
                                     const section18 = document.getElementById('seccion18');
                                     html2canvas(section18, { scale: 0.8 }).then((canvas18) => {
                                       const imgData18 = canvas18.toDataURL('image/png');
                                       const imgHeight18 = (canvas18.height * imgWidth) / canvas18.width;
 
                                       pdf.addPage();
                                       pdf.addImage(imgData18, 'PNG', 20, 20, imgWidth, imgHeight18);
 
                                       // Capturar la decimonovena sección
                                       const section19 = document.getElementById('seccion19');
                                       html2canvas(section19, { scale: 0.8 }).then((canvas19) => {
                                         const imgData19 = canvas19.toDataURL('image/png');
                                         const imgHeight19 = (canvas19.height * imgWidth) / canvas19.width;
 
                                         pdf.addPage();
                                         pdf.addImage(imgData19, 'PNG', 20, 20, imgWidth, imgHeight19);
 
                                         // Guardar el PDF
                                         pdf.save(nombre);
 
                                          // Ocultar el mensaje de "Descargando reporte"
                                          loadingMessage.style.display = 'none';
                                       });
                                     });
                                   });
                                 });
                               });
                             });
                           });
                         });
                       });
                     });
                   });
                 });
               });
             });
           });
         });
       });
     });
   });
 }
 