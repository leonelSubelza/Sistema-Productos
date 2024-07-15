package com.sistemaProductos.SistemaProductos.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageUtils {

    //return the path where the image will be saved
    public static Path getImagePath(String fileName) {
        String currentDirectory = System.getProperty("user.dir").replace( "\\" , "/");
        File file = new File(currentDirectory+"/src/main/resources/static/images/"+fileName);
        if (!file.exists()) {
            if (file.mkdirs()) {
                System.out.println("Archivo images creado");
            }
        }
        return Paths.get("src/main/resources/static/images/".concat(fileName));
    }

    //Save the image in the project directory
    public static boolean saveImage(MultipartFile imageObj, String fileName){
/*        String currentDirectory = System.getProperty("user.dir").replace( "\\" , "/");
        File file = new File(currentDirectory+"/src/main/resources/static/images");
        if (!file.exists()) {
            if (file.mkdirs()) {
                System.out.println("Archivo images creado");
            }
        }
        Path path = Paths.get("src//main//resources//static/images");*/
        Path path = ImageUtils.getImagePath(fileName);
        String absolutePath = path.toFile().getAbsolutePath();
        try{
            byte[] bytesImg = imageObj.getBytes();
            Path completePath = Paths.get(absolutePath+"//"+imageObj.getOriginalFilename());
            Files.write(completePath,bytesImg);
//            product.setImagen(imageObj.getOriginalFilename());
            return true;
        }catch (IOException e){
            e.printStackTrace();
            return false;
        }
    }

    public static boolean deleteImageSaved(String imgName,String fileName) {
        Path path = ImageUtils.getImagePath(fileName);
        String absolutePath = path.toFile().getAbsolutePath();
        try {
            Path completePath = Paths.get(absolutePath + "//" + imgName);
            Files.deleteIfExists(completePath);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}
