<template>
  <div class="container my-4">
    <!-- 사용자 선택 -->
    <div class="mb-3">
      <label for="userSelect" class="form-label">사용자 선택</label>
      <select v-model="selectedUser" class="form-select" id="userSelect">
        <option value="상일">상일</option>
        <option value="건호">건호</option>
        <option value="동현">동현</option>
      </select>
    </div>

    <!-- 정산 테이블 -->
    <table class="table table-bordered mt-3" v-if="userReceipt.items.length">
      <thead class="table-light">
        <tr>
          <th>항목명</th>
          <th>수량</th>
          <th>단가</th>
          <th>총액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in userReceipt.items" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.price.toLocaleString() }}원</td>
          <td>{{ (item.count * item.price).toLocaleString() }}원</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="table-light">
          <th colspan="3">총 합계</th>
          <th>{{ userReceipt.total.toLocaleString() }}원</th>
        </tr>
      </tfoot>
    </table>

    <!-- 공유 버튼 -->
    <button
      class="btn btn-warning d-flex align-items-center gap-2 mt-3"
      @click="shareToKakao"
    >
      <i class="fas fa-share-alt"></i> {{ selectedUser }}님 공유하기
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useReceiptStore } from "@/stores/receipt";

const store = useReceiptStore();

// 사용자 선택 상태
const selectedUser = ref("상일");

// 해당 사용자의 정산 정보 가져오기
const userReceipt = computed(() => store.getReceiptByName(selectedUser.value));

/**
 * 날짜를 'YYYY년 MM월 DD일 HH시 mm분' 형식으로 포맷
 */
const formatDateTime = (isoString) => {
  return new Date(isoString).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * 카카오톡 공유 실행 함수
 */
const shareToKakao = () => {
  const name = selectedUser.value;
  const resultUrl = `https://receipie.dev/result/${name}`;
  const receipt = store.getReceiptByName(name);

  const MAX_ITEMS = 5;
  const allItems = receipt.items;
  let visibleItems;

  if (allItems.length <= MAX_ITEMS) {
    visibleItems = allItems;
  } else {
    visibleItems = allItems.slice(0, MAX_ITEMS - 1);
    const remainingCount = allItems.length - visibleItems.length;
    visibleItems.push({
      item: `외 ${remainingCount}건`,
      itemOp: `${remainingCount}건 생략됨`,
    });
  }

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: store.storeName,
      description: formatDateTime(store.date),
      imageUrl: "https://receipie.dev/default-thumb.png",
      link: {
        mobileWebUrl: resultUrl,
        webUrl: resultUrl,
      },
    },
    itemContent: {
      titleImageUrl: "https://adari-fe.vercel.app/hangyodong.png",
      titleImageText: `${name}님의 정산 내역`,
      items: visibleItems.map((item) => ({
        item: item.item || item.name,
        itemOp:
          typeof item.itemOp === "string" && item.itemOp.length > 0
            ? item.itemOp
            : `${item.price?.toLocaleString() || ""}원 x${item.count || ""}`,
      })),
      sum: "총 결제금액",
      sumOp: `${receipt.total.toLocaleString()}원`,
    },
    buttons: [
      {
        title: "상세 내역 확인",
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
    ],
  });
};
</script>
