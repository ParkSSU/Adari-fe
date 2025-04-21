<template>
  <div>
    <video ref="video" autoplay playsinline></video>
    <button class="btn" @click="takePhoto">사진 찍기</button>
    <canvas ref="canvas" style="display: none"></canvas>
    <img v-if="photo" :src="photo" alt="캡처된 이미지" />

    <p v-if="ocrText">인식된 텍스트: {{ ocrText }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createWorker } from 'tesseract.js';

const video = ref(null);
const canvas = ref(null);
const photo = ref(null);
const ocrText = ref('');

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });
  video.value.srcObject = stream;
});

const takePhoto = async () => {
  const ctx = canvas.value.getContext('2d');
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  ctx.drawImage(video.value, 0, 0);
  photo.value = canvas.value.toDataURL('image/jpeg');

  await recognizeText(photo.value);
};

const recognizeText = async (imageDataUrl) => {
  ocrText.value = '🔍 인식 중...';
  const worker = await createWorker('kor'); // 한글 언어팩

  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  const {
    data: { text },
  } = await worker.recognize(imageDataUrl);
  ocrText.value = text.trim();
  await worker.terminate();
};
</script>
