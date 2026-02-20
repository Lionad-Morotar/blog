#!/usr/bin/env python3
"""Check if required tools for document extraction are installed."""

import subprocess
import sys


def check_command(cmd, name):
    """Check if a command is available."""
    try:
        result = subprocess.run(
            [cmd, "--version"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            print(f"✅ {name}: Installed")
            return True
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    print(f"❌ {name}: Not installed")
    return False


def check_python_package(package, import_name=None):
    """Check if a Python package is installed."""
    if import_name is None:
        import_name = package
    try:
        __import__(import_name)
        print(f"✅ {package}: Installed")
        return True
    except ImportError:
        print(f"❌ {package}: Not installed (pip install {package})")
        return False


def main():
    print("Checking document extraction tools...\n")

    print("PDF Tools:")
    print("-" * 40)
    has_marker = check_python_package("marker-pdf", "marker")
    has_pdftotext = check_command("pdftotext", "pdftotext (Poppler)")

    print("\nOCR Tools:")
    print("-" * 40)
    has_tesseract = check_command("tesseract", "Tesseract OCR")
    has_paddle = check_python_package("paddleocr", "paddleocr")
    has_easyocr = check_python_package("easyocr", "easyocr")

    print("\nRecommendations:")
    print("-" * 40)

    if not has_marker:
        print("• Install Marker for best PDF conversion:")
        print("  pip install marker-pdf")

    if not has_pdftotext:
        print("• Install Poppler for lightweight PDF text extraction:")
        print("  macOS: brew install poppler")
        print("  Ubuntu: apt-get install poppler-utils")

    if not has_tesseract:
        print("• Install Tesseract for OCR:")
        print("  macOS: brew install tesseract tesseract-lang")
        print("  Ubuntu: apt-get install tesseract-ocr")

    print("\nAll tools checked!")


if __name__ == "__main__":
    main()