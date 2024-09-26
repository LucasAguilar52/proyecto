window.addEventListener('load', function () {
  // Inicializar canvas con Fabric.js
  const canvas = new fabric.Canvas('myCanvas');

  let activeText = null; // Variable para guardar el texto activo

  // Añadir texto al canvas
  const addTextBtn = document.getElementById('addTextBtn');
  const textInput = document.getElementById('textInput');

  addTextBtn.addEventListener('click', function () {
    const text = new fabric.Text(textInput.value, {
      left: 100,
      top: 100,
      fontFamily: document.getElementById('fontFamily').value,
      fontSize: parseInt(document.getElementById('fontSize').value, 10),
      fill: document.getElementById('fontColor').value,
      fontWeight: 'normal', // Negrita por defecto desactivada
      fontStyle: 'normal'   // Cursiva por defecto desactivada
    });
    canvas.add(text);
    canvas.setActiveObject(text); // Hacer que el texto recién añadido sea el activo
    activeText = text; // Guardar el texto como el activo
  });

  // Actualizar color de texto en tiempo real
  const fontColorPicker = document.getElementById('fontColor');
  fontColorPicker.addEventListener('input', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.set('fill', fontColorPicker.value);
      canvas.renderAll();
    }
  });

  // Actualizar la fuente del texto en tiempo real
  const fontFamilySelector = document.getElementById('fontFamily');
  fontFamilySelector.addEventListener('change', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.set('fontFamily', fontFamilySelector.value);
      canvas.renderAll();
    }
  });

  // Actualizar el tamaño de la fuente en tiempo real
  const fontSizeInput = document.getElementById('fontSize');
  fontSizeInput.addEventListener('input', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.set('fontSize', parseInt(fontSizeInput.value, 10));
      canvas.renderAll();
    }
  });

  // Cambiar el peso de la fuente (negrita) en tiempo real
  const boldBtn = document.getElementById('boldBtn');
  boldBtn.addEventListener('click', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      const isBold = activeObject.fontWeight === 'bold';
      activeObject.set('fontWeight', isBold ? 'normal' : 'bold');
      canvas.renderAll();
    }
  });

  // Cambiar el estilo de la fuente (cursiva) en tiempo real
  const italicBtn = document.getElementById('italicBtn');
  italicBtn.addEventListener('click', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      const isItalic = activeObject.fontStyle === 'italic';
      activeObject.set('fontStyle', isItalic ? 'normal' : 'italic');
      canvas.renderAll();
    }
  });

  // Cambiar color de fondo del canvas
  const backgroundColorPicker = document.getElementById('backgroundColor');
  backgroundColorPicker.addEventListener('input', function () {
    canvas.setBackgroundColor(backgroundColorPicker.value, canvas.renderAll.bind(canvas));
  });

  // Cargar imagen seleccionada desde la galería
  const imageThumbnails = document.querySelectorAll('.thumbnail');
  imageThumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      fabric.Image.fromURL(thumbnail.src, function (img) {
        img.scale(0.5);
        canvas.add(img);
      });
    });
  });

  // Subir imagen personalizada
  const uploadImage = document.getElementById('uploadImage');
  const uploadBtn = document.getElementById('uploadBtn');
  uploadBtn.addEventListener('click', function () {
    const file = uploadImage.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result, function (img) {
        img.scale(0.5);
        canvas.add(img);
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  // Eliminar imagen seleccionada
  const removeBtn = document.getElementById('removeBtn');
  removeBtn.addEventListener('click', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {
      canvas.remove(activeObject);
    }
  });

  // Eliminar cualquier elemento seleccionado (Texto, imagen, etc.)
  const deleteSelectedBtn = document.createElement('button');
  deleteSelectedBtn.textContent = 'Eliminar seleccionado';
  document.getElementById('rightControls').appendChild(deleteSelectedBtn);

  deleteSelectedBtn.addEventListener('click', function () {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  });

  // Limpiar el canvas
  const clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', function () {
    canvas.clear();
    canvas.setBackgroundColor('#ffffff');
  });

  // Guardar el canvas como JPG
  const saveBtnJPG = document.getElementById('saveBtn');
  saveBtnJPG.addEventListener('click', function () {
    const imageData = canvas.toDataURL({
      format: 'jpeg',
      quality: 1.0,
    });
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'canvas-image.jpg';
    link.click();
  });

  // Guardar el canvas como SVG
  const saveSVGBtn = document.createElement('button');
  saveSVGBtn.textContent = 'Guardar como SVG';
  document.getElementById('rightControls').appendChild(saveSVGBtn);

  saveSVGBtn.addEventListener('click', function () {
    const svgData = canvas.toSVG();
    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    link.download = 'canvas-image.svg';
    link.click();
  });
});
