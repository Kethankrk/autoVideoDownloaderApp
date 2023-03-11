import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import styles from "./Styles/Styles";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [url, setUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);

  const fetchUrl = async (x) => {
    try {
      if (x) {
        // console.log("on fetching download url");
        setLoading(true);
        const res = await axios.post("http://192.168.29.20:1200/download", {
          url: x,
        });
        setLoading(false);
        // setUrl("");
        setDownloadUrl(res.data);
        // console.log("Fetched download url");
        return res.data;
      } else {
        alert(url);
      }
    } catch (err) {
      // console.log("Unknown error", err);
      setLoading(false);
    }
  };
  const downloadFile = async (uri) => {
    // console.log("on file save");
    setDownloadProgress(true);
    try {
      const targetUri = FileSystem.documentDirectory + "video.mp4";

      const downloadedFile = await FileSystem.downloadAsync(uri, targetUri);

      if (downloadedFile.status === 200) {
        const permission = await Permissions.askAsync(
          Permissions.MEDIA_LIBRARY
        );

        if (permission.status !== "granted") {
          return;
        }

        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync("Download");

        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
        // console.log("end");
        setDownloadProgress(false);
      }
    } catch {
      setDownloadProgress(false);
    }
  };

  useEffect(() => {
    const lol = async () => {
      const automatic = async () => {
        const text = await Clipboard.getStringAsync();
        if (text.includes("https://youtu.be")) {
          return text;
        } else {
          alert("not a youtube link");
        }
      };

      try {
        const myUrl = await automatic();
        alert(`Youtube Url found (${myUrl}). Downloading the video`)
        // console.log(`The url from clipboard is ${myUrl}`);
        const toDowanlod = await fetchUrl(myUrl);
        // console.log(`The fetched download url is ${toDowanlod}`);
        if (toDowanlod) {
          await downloadFile(toDowanlod);
          alert("Download completed. You can see the video in your '/Dowanlod' folder");
        }
      } catch (error) {
        alert(`${error} lol`);
      }
    };

    lol()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={require("./assets/mylogo.png")} style={styles.logo} />
        <Text style={styles.logoText}>Video Downloader</Text>
      </View>
      <View style={styles.mainC}>
        {downloadProgress ? (
          <Text style={styles.heroText}>Downloading...</Text>
        ) : (
          <Text style={styles.heroText}>
            {loading
              ? "Fecthing the Video url. So please wait"
              : "Download YouTube video Automatic or Manual."}
          </Text>
        )}
        <View style={styles.forSearch}>
          <TextInput
            style={styles.heroInput}
            placeholder="Enter link to Download ( useless )"
            onChangeText={(e) => setUrl(e)}
            value={url}
          />
          <TouchableOpacity onPress={fetchUrl} disabled={loading}>
            <Image
              source={require("./assets/search.png")}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.warningC}>
        <Text style={styles.warningText}>{<Text style={styles.theWarning}>!!! Warning !!!</Text>} This is Just a prototype there are so many known bugs and lack of features</Text>
      </View>
    </View>
  );
}
