# Unity Integration Guide

This guide explains how to integrate Unity WebGL builds with the machinaRL platform.

## Overview

machinaRL uses Unity WebGL builds to render 3D simulations in the browser. Each simulation scene is built as a separate WebGL application and integrated via the `UnityEmbed` component.

## Directory Structure

Unity WebGL builds should be placed in the following structure:

```
public/unity/
├── maze/
│   ├── Build/
│   │   ├── maze.data
│   │   ├── maze.framework.js
│   │   ├── maze.loader.js
│   │   └── maze.wasm
│   └── index.html
├── obstacle/
│   ├── Build/
│   └── index.html
└── ...
```

## Building Unity Scenes

1. **Open Unity Project**
   - Use Unity 2022.3 or later
   - Import ML-Agents package if needed

2. **Configure Build Settings**
   - Platform: WebGL
   - Compression Format: Gzip or Brotli
   - Template: Default (or custom ASCII-themed)

3. **Build Settings**
   ```
   Player Settings:
   - Company Name: machinaRL
   - Product Name: [Scene Name] Sim
   - Version: 1.0
   - WebGL Template: Default
   ```

4. **Build the Scene**
   - File → Build Settings
   - Add scenes to build
   - Build to `public/unity/[scene-name]/`

## Integration Steps

1. **Place Build Files**
   ```bash
   # Copy Unity build output to public directory
   cp -r /path/to/unity/build/output public/unity/maze/
   ```

2. **Update Scene Configuration**
   - Ensure `scene.loader.js` matches the scene ID
   - Verify all required files are present

3. **Test Integration**
   - Start development server: `npm run dev`
   - Navigate to simulation page
   - Check browser console for errors

## UnityEmbed Component

The `UnityEmbed` component handles Unity WebGL integration:

```tsx
<UnityEmbed 
  simId="maze" 
  onUnityMessage={(message) => console.log(message)} 
/>
```

### Props
- `simId`: Scene identifier (must match directory name)
- `onUnityMessage`: Callback for Unity-to-React communication

## Communication

### React → Unity
```javascript
// Send command to Unity
unityInstance.SendMessage("GameManager", "StartSimulation", JSON.stringify({
  model: "chatgpt",
  difficulty: "medium",
  seed: 12345
}));
```

### Unity → React
```csharp
// In Unity C# script
public void SendToReact(string message)
{
    Application.ExternalCall("UnityReactBridge", message);
}
```

## Troubleshooting

### Common Issues

1. **Build Not Loading**
   - Check file paths and naming
   - Verify WebGL build settings
   - Check browser console for errors

2. **CORS Issues**
   - Ensure proper server configuration
   - Use development server, not file:// protocol

3. **Performance Issues**
   - Optimize Unity build settings
   - Reduce texture quality if needed
   - Check WebGL memory limits

### Debug Mode

Enable debug logging in Unity:
```csharp
#if UNITY_WEBGL && !UNITY_EDITOR
    Debug.Log("Unity WebGL Debug Mode");
#endif
```

## Best Practices

1. **Optimize Builds**
   - Use appropriate compression
   - Minimize texture sizes
   - Remove unused assets

2. **Error Handling**
   - Implement proper error callbacks
   - Handle loading states gracefully
   - Provide fallback content

3. **Performance**
   - Monitor frame rates
   - Use object pooling
   - Optimize draw calls

## Example Scene Setup

Here's a minimal Unity scene setup for machinaRL:

```csharp
using UnityEngine;

public class SimulationManager : MonoBehaviour
{
    [Header("Simulation Settings")]
    public string modelId = "chatgpt";
    public string difficulty = "medium";
    public int seed = 12345;
    
    void Start()
    {
        // Initialize simulation
        InitializeSimulation();
    }
    
    void InitializeSimulation()
    {
        // Setup scene based on parameters
        Random.InitState(seed);
        // Configure difficulty settings
        // Start simulation
    }
    
    public void StartSimulation(string jsonData)
    {
        // Parse JSON data from React
        var data = JsonUtility.FromJson<SimulationData>(jsonData);
        // Apply settings and start
    }
    
    public void SendResult(string result)
    {
        // Send result back to React
        Application.ExternalCall("UnityReactBridge", result);
    }
}

[System.Serializable]
public class SimulationData
{
    public string model;
    public string difficulty;
    public int seed;
}
```

## Resources

- [Unity WebGL Documentation](https://docs.unity3d.com/Manual/webgl.html)
- [ML-Agents Documentation](https://github.com/Unity-Technologies/ml-agents)
- [WebGL Performance Guide](https://docs.unity3d.com/Manual/webgl-performance.html)
