# Marker Advanced Guide

## Installation Requirements

```bash
pip install marker-pdf
```

Requires Python 3.9+

## Command Reference

### Basic Usage

```bash
# Process single PDF
marker single input.pdf --output_dir ./output

# Process directory of PDFs
marker --output_dir ./output ./pdf_directory/
```

### Options

| Option | Description | Example |
|--------|-------------|---------|
| `--output_dir` | Output directory (required) | `--output_dir ./output` |
| `--page_range` | Specific pages to process | `--page_range "0,5-10,20"` |
| `--max_files` | Limit number of PDFs to process | `--max_files 10` |
| `--workers` | Number of parallel workers | `--workers 4` |
| `--disable_image_extraction` | Skip image extraction | `--disable_image_extraction` |
| `--output_format` | Output format (default: markdown) | `--output_format json` |

### Page Range Syntax

- Single page: `5`
- Range: `5-10`
- Multiple: `0,5-10,20,25-30`
- Note: Pages are 0-indexed

## Output Structure

```
output/
├── input_name/
│   ├── input_name.md              # Main markdown file
│   ├── input_name_meta.json       # Metadata (page count, etc.)
│   ├── _page_0_Picture_1.jpeg     # Extracted images
│   ├── _page_3_Picture_0.jpeg
│   └── ...
```

## Performance Tips

1. **First run is slow** - Downloads models (~1-2GB)
2. **Subsequent runs are fast** - Models cached locally
3. **GPU acceleration** - Automatically uses CUDA if available
4. **Batch processing** - Process multiple files in parallel

## Troubleshooting

### Out of Memory

```bash
# Reduce workers
marker --workers 1 --output_dir ./output input.pdf
```

### Slow on CPU

- First run requires model download
- Consider using `--page_range` for testing
- GPU significantly speeds up processing

### Poor Table Recognition

- Marker handles tables well by default
- Very complex tables may need manual cleanup
- Consider using `--debug_print` to see detection details

## Comparison with Alternatives

| Tool | Speed | Quality | Tables | Images | Best For |
|------|-------|---------|--------|--------|----------|
| Marker | Medium | Excellent | Yes | Extracted | Technical docs |
| pdftotext | Fast | Poor | No | No | Quick text extraction |
| pdfplumber | Medium | Good | Yes | No | Programmatic extraction |
| PyMuPDF | Fast | Good | Limited | Yes | General purpose |