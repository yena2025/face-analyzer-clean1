// 간단한 face-api.js 초기화 예제
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');
}

loadModels();

document.getElementById('imageUpload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const image = await faceapi.bufferToImage(file);
  const canvas = document.getElementById('canvas');
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = '얼굴 분석 중...';

  const detections = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
                                  .withFaceLandmarks()
                                  .withFaceExpressions();

  if (detections) {
    resultDiv.innerText = '얼굴이 감지되었습니다.';
  } else {
    resultDiv.innerText = '얼굴을 감지할 수 없습니다.';
  }
});
