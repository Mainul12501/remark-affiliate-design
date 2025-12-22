// Home page
$(document).on('click', '.home-price-active-btn', function () {
    $('.home-price-active-btn').removeClass('active');
    $(this).addClass('active');
    if ($(this).attr('id') == 'influencerBenifitCardBtn') {
        $('#influencerRates').removeClass('d-none');
        $('#agentRates').addClass('d-none');
    } else {
        $('#influencerRates').addClass('d-none');
        $('#agentRates').removeClass('d-none');
    }
})

// Bank Details - File Upload with Drag & Drop and Preview
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all upload dropzones
    const dropzones = document.querySelectorAll('.bank-upload-dropzone');

    dropzones.forEach(function(dropzone) {
        const fileInput = dropzone.querySelector('.bank-upload-input');
        const uploadContent = dropzone.querySelector('.bank-upload-content');
        const uploadPreview = dropzone.querySelector('.bank-upload-preview');
        const previewImage = dropzone.querySelector('.bank-preview-image');
        const removeBtn = dropzone.querySelector('.bank-remove-file');

        if (!fileInput) return;

        // Click to upload
        dropzone.addEventListener('click', function(e) {
            if (!e.target.classList.contains('bank-remove-file') &&
                !e.target.closest('.bank-remove-file')) {
                fileInput.click();
            }
        });

        // File input change
        fileInput.addEventListener('change', function(e) {
            handleFiles(this.files);
        });

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, function() {
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, function() {
                dropzone.classList.remove('dragover');
            }, false);
        });

        // Handle dropped files
        dropzone.addEventListener('drop', function(e) {
            const files = e.dataTransfer.files;
            handleFiles(files);
        }, false);

        // Remove file button
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                fileInput.value = '';
                uploadContent.style.display = 'flex';
                uploadPreview.style.display = 'none';
                previewImage.src = '';
            });
        }

        // Handle file preview
        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                const fileType = file.type;

                // Check if it's an image or PDF
                if (fileType.startsWith('image/')) {
                    const reader = new FileReader();

                    reader.onload = function(e) {
                        previewImage.src = e.target.result;
                        uploadContent.style.display = 'none';
                        uploadPreview.style.display = 'flex';
                    };

                    reader.readAsDataURL(file);
                } else if (fileType === 'application/pdf') {
                    // For PDF, show a PDF icon placeholder
                    previewImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zMCAyNUg3MFY3NUgzMFYyNVoiIGZpbGw9IiNFNUU1RTUiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBERjwvdGV4dD4KPC9zdmc+';
                    uploadContent.style.display = 'none';
                    uploadPreview.style.display = 'flex';
                }
            }
        }

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Initialize Highcharts for Your Earnings tab
    if (document.getElementById('earningsMainChart')) {
        // Main Earnings Chart
        Highcharts.chart('earningsMainChart', {
            chart: {
                type: 'areaspline',
                backgroundColor: 'transparent',
                height: 350
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                lineColor: '#e5e5e5',
                tickColor: '#e5e5e5',
                labels: {
                    style: {
                        color: '#666',
                        fontSize: '11px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: '#f5f5f5',
                labels: {
                    style: {
                        color: '#666',
                        fontSize: '11px'
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' ৳',
                backgroundColor: '#fff',
                borderColor: '#e5e5e5',
                borderRadius: 8,
                style: {
                    color: '#333',
                    fontSize: '12px'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(16, 185, 129, 0.4)'],
                            [1, 'rgba(16, 185, 129, 0.05)']
                        ]
                    },
                    lineColor: '#10b981',
                    lineWidth: 3,
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 5,
                                fillColor: '#10b981',
                                lineColor: '#fff',
                                lineWidth: 2
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Earnings',
                data: [3200, 3500, 2800, 4100, 4500, 5200, 6100, 5900, 4800, 5500, 6200, 6400]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 250
                        },
                        xAxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        },
                        yAxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                }]
            }
        });

        // Product Charts (smaller line charts)
        const productChartOptions = {
            chart: {
                type: 'line',
                backgroundColor: 'transparent',
                height: 100,
                margin: [10, 10, 30, 40]
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                lineColor: '#e5e5e5',
                tickLength: 0,
                labels: {
                    style: {
                        color: '#999',
                        fontSize: '9px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                }
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                line: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(16, 185, 129, 0.3)'],
                            [1, 'rgba(16, 185, 129, 0.05)']
                        ]
                    },
                    lineColor: '#10b981',
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    }
                },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, 'rgba(16, 185, 129, 0.3)'],
                            [1, 'rgba(16, 185, 129, 0.05)']
                        ]
                    },
                    lineColor: '#10b981',
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                type: 'area',
                data: [320, 280, 350, 410, 390, 420, 480, 510, 490, 530, 560, 590]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 80
                        },
                        xAxis: {
                            labels: {
                                style: {
                                    fontSize: '8px'
                                }
                            }
                        }
                    }
                }]
            }
        };

        // Initialize product charts
        ['productChart1', 'productChart2', 'productChart3'].forEach(function(chartId) {
            const chartElement = document.getElementById(chartId);
            if (chartElement) {
                Highcharts.chart(chartId, productChartOptions);
            }
        });
    }
});