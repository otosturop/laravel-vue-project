<?php
namespace App\Helper;

use Intervention\Image\Facades\Image;
use File;

class ImageHelper {

    static function upload($name, $directory, $file, $with, $height) {
        $dir = 'upload_images/' . $directory;

        if(!empty($file)){

            if(!File::exists($dir)) {
                File::makeDirectory($dir, 755, true);
            }
            $fileName = $name . "-" . rand(1,9000). '.' . $file->getClientOriginalExtension();
            $path = public_path($dir . $fileName);
            Image::make($file->getRealPath())->resize($with, $height)->save($path);
            return $dir . $fileName;
        } else {
            return "";
        }
    }

}
