# Computational Photography
## _CECS 553 Machine Vision_
by
Pavan Sai Kalyan, Badam
Naga Bala Venkatesh, Ramoju

Auto enhancing an input image either by adjusting the exposure levels, saturation, or white balance. This will be done dynamically based on the input image.

## Dataset

- DPED: DSLR Photo Enhancement Dataset
http://people.ee.ethz.ch/%7Eihnatova/index.html#dataset
-	Around 22,000 same images were taken using Sony, iPhone, blackberry mobiles and Canon DSLR camera.
-	Then, each image was made into multiple patches of 100x100 sized images of 139,000, 160,000 and 162,000 pairs for BlackBerry, iPhone, and Sony respectively.
-	Total dataset size = 922,000 images

## Algorithm

-	Here, we intend to find a mapping function between photos from mobile devices and a DSLR camera using DPED dataset.
-	Since, all cameras have different focal lengths, quality, and distortion, we cannot compare images directly.
-	First, the input image is enhanced using 12-layer residual CNN to replicate the corresponding DSLR image.



-	We compare the enhanced image with the target image (DSLR) to compute the color loss, texture loss and content loss. 

_All these losses are then added, and the system is trained with the backpropagation algorithm to minimize the final weighted loss._

## Paper
DSLR-Quality Photos on Mobile Devices with Deep Convolutional Networks 
https://arxiv.org/pdf/1704.02470.pdf 

## Results

https://github.com/SaiKalyan124/Machine-Vision1/blob/main/output_images/_before_after.png
