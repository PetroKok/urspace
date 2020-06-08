<?php


namespace App\Traits;


use App\Models\File;
use Illuminate\Support\Facades\Storage;

trait FileTrait
{
    public function destroy($id)
    {
        $file = File::findOrFail($id);
        try {
            if (Storage::exists($file->link)) {
                Storage::delete($file->link);
            }

            $file->delete();
            return true;
        } catch (\Exception $e) {
        }
        return false;
    }

    public function destroyMultiple($data)
    {
        foreach ($data as $id) {
            if (!$this->destroy($id)) {
                return false;
            }
        }
        return true;
    }
}
