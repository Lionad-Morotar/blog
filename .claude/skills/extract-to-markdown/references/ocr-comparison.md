# OCR Tool Comparison

## Quick Reference

| Tool | Best For | Language Support | Speed | Accuracy | Setup |
|------|----------|------------------|-------|----------|-------|
| **Claude Vision** | Screenshots, clear text | All (via multimodal) | Instant | High | None |
| **Tesseract** | Scanned documents | 100+ languages | Medium | Good | Easy |
| **PaddleOCR** | Chinese, complex layouts | 80+ languages | Medium | Excellent | Moderate |
| **EasyOCR** | Multi-language | 80+ languages | Medium | Good | Easy |
| **Azure/Google Vision** | Production apps | 200+ languages | API | Excellent | API key |

## Detailed Comparison

### Claude Vision (Multimodal)

**Pros:**
- No setup required
- Understands context and layout
- Handles various image qualities
- Can interpret diagrams and UI

**Cons:**
- Requires Claude/Code access
- Not for batch processing
- Rate limits apply

**Use when:**
- Quick screenshot extraction
- Need contextual understanding
- One-off tasks

### Tesseract OCR

**Pros:**
- Open source, free
- Lightweight
- Good for clean documents
- Extensive language support

**Cons:**
- Struggles with complex layouts
- Limited table recognition
- Requires preprocessing for best results

**Use when:**
- Simple scanned documents
- Budget constraints
- Batch processing needed

**Installation:**
```bash
# macOS
brew install tesseract tesseract-lang

# Ubuntu
sudo apt-get install tesseract-ocr tesseract-ocr-[lang]
```

### PaddleOCR

**Pros:**
- Excellent Chinese/Asian language support
- Good for complex layouts
- Angle classification (rotated text)
- Active development

**Cons:**
- Larger model size
- Slower than Tesseract
- More complex setup

**Use when:**
- Chinese/Japanese/Korean documents
- Complex layouts with mixed elements
- Higher accuracy needed

**Installation:**
```bash
pip install paddleocr
```

### EasyOCR

**Pros:**
- Simple Python API
- Good multi-language support
- GPU support
- No external dependencies

**Cons:**
- Larger model downloads
- Slower than Tesseract

**Use when:**
- Python-based workflow
- Multiple languages in one document

**Installation:**
```bash
pip install easyocr
```

## Language Support

### Tesseract Language Packs

Common packs:
- `eng` - English
- `chi_sim` - Chinese Simplified
- `chi_tra` - Chinese Traditional
- `jpn` - Japanese
- `kor` - Korean
- `deu` - German
- `fra` - French
- `spa` - Spanish

Install all:
```bash
# macOS
brew install tesseract-lang

# Ubuntu
sudo apt-get install tesseract-ocr-all
```

### PaddleOCR Language Codes

- `ch` - Chinese (Simplified + Traditional)
- `en` - English
- `japan` - Japanese
- `korean` - Korean
- `german` - German
- `french` - French

## Image Preprocessing Tips

Better preprocessing = better OCR results:

```python
import cv2
import numpy as np

def preprocess_for_ocr(image_path):
    # Read image
    img = cv2.imread(image_path)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Denoise
    denoised = cv2.fastNlMeansDenoising(gray)

    # Threshold (adaptive for varying lighting)
    binary = cv2.adaptiveThreshold(
        denoised, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY, 11, 2
    )

    # Deskew if needed
    # (detect rotation and rotate back)

    return binary
```

## Choosing the Right Tool

```
Document type?
├── Screenshot/UI image
│   └── Claude Vision (simplest)
├── Scanned document (English)
│   └── Tesseract (fastest setup)
├── Chinese/Asian language
│   └── PaddleOCR (best accuracy)
├── Multi-language mixed
│   └── EasyOCR or PaddleOCR
├── Production API needed
│   └── Azure/Google/Amazon Textract
└── Batch processing (10k+ images)
    └── Tesseract (most efficient)
```