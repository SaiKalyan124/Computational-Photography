from scipy import misc
import numpy as np
import tensorflow as tf
from model import resnet
import utils
import os
import sys
import tensorflow.compat.v1 as tf1
from PIL import Image
import numpy as np
import imageio
tf.compat.v1.disable_eager_execution()


phone = "iphone"
resolution = "small"
use_gpu = "true"

# get all available image resolutions
res_sizes = utils.get_resolutions()

# get the specified image resolution
IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE = utils.get_specified_res(res_sizes, phone, resolution)

# disable gpu if specified
config = tf.ConfigProto(device_count={'GPU': 0}) if use_gpu == "false" else None

# create placeholders for input images
x_ = tf1.placeholder(tf.float32, [None, IMAGE_SIZE])
x_image = tf.reshape(x_, [-1, IMAGE_HEIGHT, IMAGE_WIDTH, 3])

# generate enhanced image
enhanced = resnet(x_image)

with tf1.Session(config=config) as sess:

    # load pre-trained model
    saver = tf1.train.Saver()
    saver.restore(sess, "models/" + phone)

    test_dir = "uploads/"
    test_photos = [f for f in os.listdir(test_dir) if os.path.isfile(test_dir + f)]

    for photo in test_photos:

        # load training image and crop it if necessary
        print("Processing image " + photo)
        # image = np.float16(misc.imresize(misc.imread(test_dir + photo), res_sizes[phone])) / 255


        Im = Image.open(test_dir + photo)
        arr = np.asarray(Im)
        image = np.array(Image.fromarray(arr).resize(res_sizes[phone]))/ 255
        image_crop = utils.extract_crop(image, resolution, phone, res_sizes)
        image_crop_2d = np.reshape(image_crop, [1, IMAGE_SIZE])
        print("Preparing enhanced image...")
        # get enhanced image

        enhanced_2d = sess.run(enhanced, feed_dict={x_: image_crop_2d})
        enhanced_image = np.reshape(enhanced_2d, [IMAGE_HEIGHT, IMAGE_WIDTH, 3])
        
        before_after = np.hstack((image_crop, enhanced_image))
        photo_name = photo.rsplit(".", 1)[0]
        print("Finalizing the process...")
        # save the results as .png images

        imageio.imwrite("output_images/" + "_original.png", image_crop)
        imageio.imwrite("output_images/" + "_processed.png", enhanced_image)
        imageio.imwrite("output_images/" + "_before_after.png", before_after)

