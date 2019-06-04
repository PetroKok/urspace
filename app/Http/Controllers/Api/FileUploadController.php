<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\FileStoreRequest;
use App\Models\File;
use App\Repositories\App\File\FileRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    protected $model;

    public function __construct(File $file)
    {
        $this->model = new FileRepository($file);
    }

    public function index()
    {
        return $this->model->index();
    }

    public function store(FileStoreRequest $request)
    {
        $files = $this->model->store($request->all());
        return response(['status' => 200, 'message' => ['type' => 'success', 'message' => 'Added!'], 'files' => $files]);
    }

    public function deleteFiles(Request $request)
    {
        $data = $request->all();
        foreach ($data['files'] as $id) {
            $file = File::findOrFail($id);
            if(Storage::exists($file->link)){
                try{
                    Storage::delete($file->link);
                    $file->delete();
                }catch(\Exception $e){
                    return abort(500);
                }
            }else{
                $file->delete();
            }
        }
        return response(['status' => 200, 'message' => 'Deleted']);
    }

    public function delete($id)
    {
        $file = File::findOrFail($id);
        if (Storage::exists($file->link)) {
            try {
                Storage::delete($file->link);
                $file->delete();
                return response(['status' => 200, 'message' => 'Deleted']);
            } catch (\Exception $e) {
                return abort(500);
            }
        } else {
            $file->delete();
            return response(['status' => 200, 'message' => 'Deleted']);
        }
    }

    public function accessed(){
        return response(['status' => 200, 'data' => $this->model->accessed_files()], 200);
    }
}
