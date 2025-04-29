<template>
  <div>
    <!-- 로딩 스피너 표시 -->
    <div v-if="isLoading" class="text-center mt-5">
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 5rem; height: 5rem"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">분석 중입니다... 잠시만 기다려주세요.</p>
    </div>
    
    <div class="container mt-5">
      <!-- 카메라 및 갤러리 업로드 버튼 -->
      <div class="d-flex justify-content-start gap-2 mt-3">
        <button class="btn btn-primary" @click="triggerCamera">
          <i class="fas fa-camera me-2"></i> Camera
        </button>
        <button class="btn btn-secondary" @click="triggerGallery">
          <i class="fas fa-image me-2"></i> Gallery
        </button>
      </div>

      <!-- 이미지 미리보기 -->
      <div v-if="base64Images.length > 0" class="mt-4">
        <div class="row">
          <div
            class="col-6 col-md-4 mb-3"
            v-for="(img, index) in base64Images"
            :key="index"
          >
            <img
              :src="'data:image/jpeg;base64,' + img"
              alt="미리보기 이미지"
              class="img-fluid border"
            />
          </div>
        </div>
      </div>

      <!-- 홈 및 분석 이동 버튼 -->
      <div class="d-flex flex-column gap-2 mt-3 w-50 mx-auto">
        <button class="btn btn-outline-primary" @click="goHome">
          Back to Home
        </button>
        <button class="btn btn-outline-secondary" @click="analyzeAndEdit">
          Edit
        </button>
      </div>
    </div>

    <!-- 숨겨진 파일 입력 필드 -->
    <input
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      style="display: none"
      @change="handleFileChange"
    />
    <input
      ref="galleryInput"
      type="file"
      multiple
      accept="image/*"
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTransactionStore } from "@/stores/transactionStore";
import axios from "axios";

// loading Spinner
const isLoading = ref(false);

// 라우터 및 전역 스토어
const router = useRouter();
const transactionStore = useTransactionStore();

// 이미지 input 요소 참조
const cameraInput = ref(null);
const galleryInput = ref(null);

// base64 이미지 배열
const base64Images = ref([]);

/////////////////////////////
// 버튼 핸들러
/////////////////////////////

/** 홈으로 이동 */
const goHome = () => {
  router.push("/home");
};

/** 분석 → /edit 페이지로 이동 */
const analyzeAndEdit = async () => {
  isLoading.value = true;

  try {
    const success = await sendImages();
    if (success) {
      router.push("/edit");
    }
  } finally {
    isLoading.value = false;
  }
};

/** 카메라 input 클릭 트리거 */
const triggerCamera = () => {
  cameraInput.value?.click();
};

/** 갤러리 input 클릭 트리거 */
const triggerGallery = () => {
  galleryInput.value?.click();
};

/////////////////////////////
// 파일 처리 & API 요청
/////////////////////////////

/** 파일 선택 시 base64로 변환 */
const handleFileChange = async (event) => {
  // 선택된 파일들을 배열로 변환 (FileList → Array)
  const files = Array.from(event.target.files);

  try {
    // 파일들을 base64 문자열로 변환하는 작업을 병렬로 처리
    const base64List = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성

            // 파일 읽기 성공 시 실행
            reader.onload = () => {
              // reader.result 는 "data:image/jpeg;base64,..." 형식이므로
              // 쉼표(,) 이후의 base64 데이터만 추출
              const base64Data = reader.result.split(",")[1];
              resolve(base64Data); // base64 문자열 resolve
            };

            // 파일 읽기 실패 시 실행
            reader.onerror = reject;

            // 파일을 base64 Data URL 형식으로 읽음 (비동기)
            reader.readAsDataURL(file);
          })
      )
    );

    // 모든 파일이 성공적으로 base64로 변환된 후 배열에 저장
    base64Images.value = base64List;
  } catch (error) {
    console.error("파일 읽기 실패:", error);
  }
};

/** 이미지 분석 API 호출 및 전역 상태 저장 */
const sendImages = async () => {
  if (base64Images.value.length === 0) {
    alert("이미지를 선택해주세요.");
    return false;
  }

  try {
    const { data } = await axios.post("/api/ocr/analyze", {
      base64Images: base64Images.value,
    });

    transactionStore.setTransactionData({
      items: data.items,
      store: data.storeName,
      date: data.date,
    });
    transactionStore.setBuyers(data.buyers);

    return true;
  } catch (error) {
    console.error("영수증 분석 실패:", error);
    return false;
  }
};
</script>
